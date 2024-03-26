import { models, sequelize } from "../../configs/mysql.js";

async function createOneUser(user) {
    const createdUser = await models.User.create(user);
    return createdUser.toJSON();
}

async function updateOneUser(user_id, updatedUser) {
    await models.User.update(updatedUser, { where: { user_id } });
}

async function findOneUserById(user_id) {
    const user = await models.User.findByPk(user_id);
    return user ? user.toJSON() : null;
}

async function findOneUserByIdWithRoles(user_id) {
    const user = await models.User.findByPk(user_id, {
        include: {
            model: models.Role,
            required: false,
        },
    });
    return user ? user.toJSON() : null;
}

async function findOneUserByEmail(email) {
    const user = await models.User.findOne({
        where: { email: email },
    });
    return user ? user.toJSON() : null;
}

async function findOneUserByEmailWithRoles(email) {
    const user = await models.User.findOne({
        where: { email: email },
        include: {
            model: models.Role,
            required: false,
        },
    });
    return user ? user.toJSON() : null;
}

async function isUserExistByEmail(email) {
    const user = await models.User.findOne({
        where: { email: email },
        raw: true,
    });
    return user ? true : false;
}

async function findAllUser(query) {
    let { page = 1, limit = 10 } = query;

    page = parseInt(page);
    limit = parseInt(limit);

    const users = await models.User.findAll({
        include: {
            model: models.Role,
            required: false,
        },
        offset: (page - 1) * limit,
        limit: limit,
    });

    return users.map((user) => user.toJSON());
}

async function deleteOneUser(user_id) {
    await models.User.destroy({ where: { user_id } });
}

export default {
    createOneUser,
    updateOneUser,
    findOneUserById,
    findOneUserByIdWithRoles,
    findOneUserByEmail,
    findOneUserByEmailWithRoles,
    isUserExistByEmail,
    findAllUser,
    deleteOneUser
};