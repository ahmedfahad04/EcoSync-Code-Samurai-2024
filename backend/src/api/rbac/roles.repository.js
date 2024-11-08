import { models } from "../../configs/mysql.js";

async function findOneRoleById(role_id) {
    const role = await models.Role.findByPk(role_id);
    return role ? role.toJSON() : null;
}

async function findOneRoleByName(role_name) {
    const role = await models.Role.findOne({ where: { role_name } });
    return role ? role.toJSON() : null;
}

async function findAllRole() {
    const roles = await models.Role.findAll();
    return roles.map((role) => role.toJSON());
}

export default {
    findOneRoleById,
    findOneRoleByName,
    findAllRole,
};
