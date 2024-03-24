import { HttpError } from "../../utils/HttpError.js";
import usersRepository from "../users/users.repository.js";
import utils from "../../utils/utils.js";
import config from "../../configs/config.js";

async function login(email, password) {
    const user = await usersRepository.findOneByEmail(email);

    if (!user) throw new HttpError({ message: `invalid email or password` }, 404);

    // include this line in production, also remove docker volume from app-server.
    // const isVerified = await utils.verifyPassword(password, user.password);

    const isVerified = user.password === password;
    if (!isVerified) throw new HttpError({ message: "invalid email or password" }, 401);

    const accessToken = utils.generateJwtToken(
        {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            roles: user.roles,
        },
        config.jwt.accessTokenExpiry
    );

    return { accessToken };
}

async function signup(signUpDto) {
    const exists = await usersRepository.isExistByEmail(signUpDto.email);
    if (exists) throw new HttpError({ email: "email address already exists" }, 409);

    // add default role as user
    signUpDto.roles = ["user"];

    // include this line in production, also remove docker volume from app-server.
    // signUpDto.password = await utils.hashPassword(signUpDto.password);

    const user = await usersRepository.create(signUpDto);

    delete user.password;

    return { user };
}

export default { login, signup };
