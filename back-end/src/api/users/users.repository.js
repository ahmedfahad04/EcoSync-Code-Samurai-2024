import { models } from "../../configs/mysql.js";

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
            through: {
                model: models.UserRole,
                attributes: [],
            },
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
            through: {
                model: models.UserRole,
                attributes: [],
            },
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

export default {
    createOneUser,
    updateOneUser,
    findOneUserById,
    findOneUserByIdWithRoles,
    findOneUserByEmail,
    findOneUserByEmailWithRoles,
    isUserExistByEmail,
};
