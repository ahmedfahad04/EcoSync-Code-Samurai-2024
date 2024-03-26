import { HttpError } from "../../utils/HttpError.js";
import usersRepository from "./users.repository.js";
import utils from "../../utils/utils.js";
import rbacRepository from "../rbac/rbac.repository.js";
import { RoleTypes } from "../../models/Role.js";

async function create(userDto) {
    const exists = await usersRepository.isUserExistByEmail(userDto.email);
    if (exists) throw new HttpError({ email: "email address already exists" }, 409);

    userDto.password = await utils.hashPassword(userDto.password);

    let role;
    if (userDto.role_id) {
        role = await rbacRepository.findOneRoleById(userDto.role_id);
        if (!role) throw new HttpError({ role_id: "invalid role_id" }, 400);
    } else {
        role = await rbacRepository.findOneRoleByName(RoleTypes.unassigned);
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
    return users;
}

async function update(user_id, userDto) {
    const user = await usersRepository.findOneUserById(user_id);

    if (!user) throw new HttpError({ message: `user with id: ${user_id} not found` }, 404);

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

    const role = await rbacRepository.findOneRoleById(role_id);
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
