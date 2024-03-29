import { models, Op } from "../../configs/mysql.js";
import { HttpError } from "../../utils/HttpError.js";

async function findAllPermission(req, res) {
    const permissions = await models.Permission.findAll({
        order: [["permission_name", "ASC"]],
    });
    res.json(permissions);
}

async function findAllRole(req, res) {
    const roles = await models.Role.findAll({
        order: [["role_name", "ASC"]],
    });
    res.json(roles);
}

async function assignPermissionsToRole(req, res) {
    const { role_id } = req.params;
    const { permission_names } = req.body;

    const role = await models.Role.findByPk(role_id);
    if (!role) throw new HttpError({ message: "role not found" }, 404);

    const permissions = await models.Permission.findAll({
        where: {
            permission_name: {
                [Op.in]: permission_names,
            },
        },
    });

    const roleIdPermissionId = [];
    for (const permission of permissions) {
        roleIdPermissionId.push({ role_id: role.role_id, permission_id: permission.permission_id });
    }

    await models.RolePermission.bulkCreate(roleIdPermissionId, { updateOnDuplicate: ["role_id", "permission_id"] });

    res.json({ message: "permission assigned successfully" });
}

async function findAllPermissionOfRole(req, res) {
    const { role_id } = req.params;

    const role = await models.Role.findByPk(role_id);
    if (!role) throw new HttpError({ message: "role not found" }, 404);

    const permissions = await models.Permission.findAll({
        include: {
            model: models.Role,
            where: {
                role_id,
            },
            through: {
                model: models.RolePermission,
                attributes: [],
            },
            attributes: [],
        },
        order: [["permission_name", "ASC"]],
    });
    res.json(permissions);
}

export default {
    findAllPermission,
    findAllRole,
    assignPermissionsToRole,
    findAllPermissionOfRole,
};
