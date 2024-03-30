import { models, Op } from "../../configs/mysql.js";
import { HttpError } from "../../utils/HttpError.js";
import { roleConstants } from "./constants/roles.constants.js";

async function findAllPermission(req, res) {
    const permissions = await models.Permission.findAll({
        order: [["permission_name", "ASC"]],
    });
    res.json(permissions);
}

async function findOnePermission(req, res) {
    const { permission_id } = req.params;
    const permission = await models.Permission.findByPk(permission_id);
    res.json(permission);
}

async function createOneRole(req, res) {
    const roleDto = req.body;

    const existedRole = await models.Role.findOne({
        where: {
            role_name: roleDto.role_name,
        },
    });
    if (existedRole) throw new HttpError({ role_name: "role already exist" }, 400);

    let role = await models.Role.create({ ...roleDto, role_name: roleDto.role_name.toUpperCase() });
    role = role.toJSON();

    res.status(201).json(role);
}

async function findOneRole(req, res) {
    const { role_id } = req.params;
    const role = await models.Role.findByPk(role_id);
    res.json(role);
}

async function updateRole(req, res) {
    const { role_id } = req.params;
    const roleDto = req.body;

    if (roleDto.role_name) {
        const exist = await models.Role.findOne({ where: { role_name: roleDto.role_name } });
        if (exist) throw new HttpError({ message: "role_name already exists" }, 400);
    }

    await models.Role.update(roleDto, { where: { role_id } });

    res.json({ message: "role updated successfully" });
}

async function deleteRole(req, res) {
    // cannot delete predefined roles
    const { role_id } = req.params;

    const role = await models.Role.findByPk(role_id);
    if (!role) throw new HttpError({ message: "role not found" }, 404);

    const predefinedRoles = Object.values(roleConstants);
    if (predefinedRoles.includes(role.role_name)) throw new HttpError({ message: "cannot delete predefined role" }, 403);

    await models.Role.destroy({ where: { role_id } });

    res.json({ message: "role deleted successfully" });
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

async function removePermissionFromRole(req, res) {
    const { role_id, permission_id } = req.params;

    await models.RolePermission.destroy({ where: { role_id, permission_id } });

    res.json({ message: "permission removed successfully" });
}

export default {
    findAllPermission,
    findOnePermission,
    createOneRole,
    findOneRole,
    updateRole,
    deleteRole,
    findAllRole,
    assignPermissionsToRole,
    findAllPermissionOfRole,
    removePermissionFromRole,
};
