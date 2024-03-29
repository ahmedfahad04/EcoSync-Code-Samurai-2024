import { models } from "../../configs/mysql.js";
import {HttpError} from "../../utils/HttpError.js"

async function findAllPermission(req, res) {
    const permissions = await models.Permission.findAll({
        order: [["permission_name", "ASC"]],
    });
    res.json(permissions);
}

async function assignPermissionsToRole(req, res) {
    const { role_id } = req.params;
    const permission_names = req.body;

    console.log(role_id, permission_names);

    res.json({ message: "permission assigned successfully" });
}

async function findAllPermissionOfRole(req, res) {
    const { role_id } = req.params;

    const role = await models.Role.findByPk(role_id);
    if(!role) throw new HttpError({message: "role not found"}, 404);

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
    assignPermissionsToRole,
    findAllPermissionOfRole,
};
