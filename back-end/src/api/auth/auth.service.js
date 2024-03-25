import { HttpError } from "../../utils/HttpError.js";
import usersRepository from "../users/users.repository.js";
import utils from "../../utils/utils.js";
import { config } from "../../configs/config.js";

async function signup(signUpDto) {
    const exists = await usersRepository.isUserExistByEmail(signUpDto.email);
    if (exists) throw new HttpError({ email: "email address already exists" }, 409);

    signUpDto.password = await utils.hashPassword(signUpDto.password);

    let user = await usersRepository.createOneUser(signUpDto);

    delete user.password;

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

export default { signup, login };
