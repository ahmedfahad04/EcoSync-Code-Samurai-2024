import { models } from "../../configs/mysql.js";

async function create(user) {
    const role = await models.Role.findOne({
        where: { role_name: user.roles[0] },
        raw: true,
    });

    let createdUser = await models.User.create(user);
    createdUser = createdUser.dataValues;
    await models.UserRole.create({ user_id: createdUser.user_id, role_id: role.role_id });

    createdUser.roles = user.roles;
    return createdUser;
}

async function findOneById(user_id) {
    const user = await models.User.findByPk(user_id, {
        include: {
            model: models.Role,
            through: {
                model: models.UserRole,
                attributes: [],
            },
        },
    });

    if (!user) return null;

    const rawUser = user.dataValues;
    rawUser.roles = user.roles.map((role) => role.role_name);

    return rawUser;
}

async function findOneByEmail(email) {
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

    if (!user) return null;

    const rawUser = user.dataValues;
    rawUser.roles = user.roles.map((role) => role.role_name);

    return rawUser;
}

async function isExistByEmail(email) {
    const user = await models.User.findOne({
        where: { email: email },
        raw: true,
    });
    return user ? true : false;
}

export default { create, findOneById, findOneByEmail, isExistByEmail };
