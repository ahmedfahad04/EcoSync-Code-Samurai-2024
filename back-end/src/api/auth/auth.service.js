import { HttpError } from "../../utils/HttpError.js";
import usersRepository from "../users/users.repository.js";
import utils from "../../utils/utils.js";
import { config } from "../../configs/config.js";
import { nodeCache } from "../../configs/nodeCache.js";
import { sendEmailWithOTP } from "../../configs/nodemailer.js";
import rbacRepository from "../rbac/rbac.repository.js";
import { RoleTypes } from "../../models/Role.js";

async function signup(signUpDto) {
    const exists = await usersRepository.isUserExistByEmail(signUpDto.email);
    if (exists) throw new HttpError({ email: "email address already exists" }, 409);

    signUpDto.password = await utils.hashPassword(signUpDto.password);

    let role;
    if (signUpDto.role_id) {
        role = await rbacRepository.findOneRoleById(signUpDto.role_id);
        if (!role) throw new HttpError({ role_id: "invalid role_id" }, 400);
    } else {
        role = await rbacRepository.findOneRoleByName(RoleTypes.unassigned);
        signUpDto.role_id = role.role_id;
    }

    let user = await usersRepository.createOneUser(signUpDto);

    delete user.password;

    user.role = role;
    return user;
}

async function login(email, password) {
    const user = await usersRepository.findOneUserByEmailWithRoles(email);

    if (!user) throw new HttpError({ message: `invalid email or password` }, 401);

    const isVerified = await utils.verifyPassword(password, user.password);
    if (!isVerified) throw new HttpError({ message: "invalid email or password" }, 401);

    const accessToken = utils.generateJwtToken(
        {
            sub: user.user_id,
        },
        config.jwt.accessTokenExpiry
    );

    let userToReturn = user;
    delete userToReturn.password;

    return { accessToken, user: userToReturn };
}

async function initiateResetPassword(email) {
    const isExist = await usersRepository.isUserExistByEmail(email);
    if (!isExist) throw new HttpError({ email: "email address does not exist" }, 404);

    const otp = utils.generateOTP();
    nodeCache.set(email, otp, 300);

    sendEmailWithOTP(email, otp);
}

async function confirmResetPassword(email, otp, password) {
    const user = await usersRepository.findOneUserByEmail(email);
    if (!user) throw new HttpError({ email: "email does not exist" }, 404);

    if (nodeCache.get(email) != otp) throw new HttpError({ otp: "invalid otp" }, 400);

    const hashedPassword = await utils.hashPassword(password);
    await usersRepository.updateOneUser(user.user_id, { password: hashedPassword });

    nodeCache.del(email);
}

async function changePassword(sub, old_password, new_password) {
    const user = await usersRepository.findOneUserById(sub);
    if (!user) throw new HttpError({ message: "user not found" }, 404);

    const isVerified = await utils.verifyPassword(old_password, user.password);
    if (!isVerified) throw new HttpError({ old_password: "invalid password" }, 400);

    const hashedPassword = await utils.hashPassword(new_password);
    await usersRepository.updateOneUser(sub, { password: hashedPassword });
}

export default { signup, login, initiateResetPassword, confirmResetPassword, changePassword };
