import { HttpError } from "../../utils/HttpError.js";
import usersRepository from "./users.repository.js";
import utils from "../../utils/utils.js";
import rolesRepository from "../rbac/roles.repository.js";
import { roleConstants } from "../rbac/constants/roles.constants.js";
import { models } from "../../configs/mysql.js";

async function create(userDto) {
    const exists = await usersRepository.isUserExistByEmail(userDto.email);
    if (exists) throw new HttpError({ email: "email address already exists" }, 409);

    if (userDto.phone_number) {
        const phone_exist = await models.User.findOne({
            where: {
                phone_number: userDto.phone_number,
            },
        });
        if (phone_exist) throw new HttpError({ phone_number: "phone number already exists" }, 400);
    }

    userDto.password = await utils.hashPassword(userDto.password);

    let role;
    if (userDto.role_id) {
        role = await rolesRepository.findOneRoleById(userDto.role_id);
        if (!role) throw new HttpError({ role_id: "invalid role_id" }, 400);
    } else {
        role = await rolesRepository.findOneRoleByName(roleConstants.Unassigned);
        userDto.role_id = role.role_id;
    }

    let user = await usersRepository.createOneUser(userDto);

    delete user.password;

    user.role = role;

    // send email with credentials

    return user;
}

async function findOne(user_id) {
    const user = await usersRepository.findOneUserByIdWithRoles(user_id);

    if (!user) throw new HttpError({ message: `user with id: ${user_id} not found` }, 404);

    delete user.password;

    return user;
}

async function findAll(query) {
    const users = await usersRepository.findAllUser(query);
    return users.map((user) => {
        delete user.password;
        return user;
    });
}

async function update(user_id, userDto) {
    const user = await usersRepository.findOneUserById(user_id);

    if (!user) throw new HttpError({ message: `user with id: ${user_id} not found` }, 404);

    if (user.email == userDto.email) delete userDto.email;

    if (user.phone_number == userDto.phone_number) delete userDto.phone_number;

    if (userDto.email) {
        const exists = await usersRepository.isUserExistByEmail(userDto.email);
        if (exists) throw new HttpError({ email: "email address already exists" }, 400);
    }

    if (userDto.phone_number) {
        const phone_exist = await models.User.findOne({
            where: {
                phone_number: userDto.phone_number,
            },
        });
        if (phone_exist) throw new HttpError({ phone_number: "phone number already exists" }, 400);
    }

    await usersRepository.updateOneUser(user_id, userDto);
}

async function deleteUser(user_id) {
    const user = await usersRepository.findOneUserById(user_id);

    if (!user) throw new HttpError({ message: `user with id: ${user_id} not found` }, 404);

    await usersRepository.deleteOneUser(user_id);
}

async function addRole(user_id, role_id) {
    const user = await usersRepository.findOneUserById(user_id);

    if (!user) throw new HttpError({ message: `user with id: ${user_id} not found` }, 404);

    const role = await rolesRepository.findOneRoleById(role_id);
    if (!role) throw new HttpError({ role_id: "invalid role_id" }, 400);

    await usersRepository.updateOneUser(user_id, { role_id });
}

export default {
    create,
    findOne,
    findAll,
    update,
    deleteUser,
    addRole,
};
