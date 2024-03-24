import { HttpError } from "../../utils/HttpError.js";
import usersRepository from "./users.repository.js";

async function create() {}

async function findOne(user_id) {
    const user = await usersRepository.findOneById(user_id);

    if (!user) throw new HttpError({ message: `user with id: ${user_id} not found` }, 404);

    delete user.password;

    return { user };
}

async function findAll() {}
async function update() {}
async function remove() {}

export default {
    create,
    findOne,
    findAll,
    update,
    remove,
};
