import { models } from "../../configs/mysql.js";

async function findAllPermission(req, res) {
    const permissions = await models.Permission.findAll({
        order: [["permission_name", "ASC"]]
    });
    res.json(permissions);
}


async function assignPermissionsToRole(req, res) {
    const { role_id } = req.params;
    const permission_names = req.body;

    console.log(role_id, permission_names);

    res.json({ message: "permission assigned successfully" });
}

export default {
    findAllPermission,
    assignPermissionsToRole,
};
