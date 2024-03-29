import { config } from "./config.js";
import { roleConstants } from "./../api/rbac/constants/roles.constants.js";
import { permissionData } from "../api/rbac/data/permissions.data.js";
import { rolePermissionData } from "../api/rbac/data/role-permission.data.js";
import { roleData } from "../api/rbac/data/roles.data.js";
import { models, Op } from "./mysql.js";
import utils from "../utils/utils.js";
import rolesRepository from "../api/rbac/roles.repository.js";

const start = async () => {
    await createRoles();
    await createPermissions();
    await assignPermissionToRoles();
    await createAdmin();
};

const createRoles = async () => {
    try {
        await models.Role.bulkCreate(roleData, { updateOnDuplicate: ["role_name"] });
        console.log("Roles are created successfully");
    } catch (error) {
        console.error("Error creating roles:", error);
    }
};

const createPermissions = async () => {
    try {
        await models.Permission.bulkCreate(permissionData, { updateOnDuplicate: ["permission_name"] });
        console.log("Permissions are created successfully");
    } catch (error) {
        console.error("Error creating permissions:", error);
    }
};

const assignPermissionToRoles = async () => {
    for (const data of rolePermissionData) {
        const role = await rolesRepository.findOneRoleByName(data.role_name);
        const permissions = await models.Permission.findAll({
            where: {
                permission_name: {
                    [Op.in]: data.permission_names,
                },
            },
        });
        const roleIdPermissionId = [];
        for (const permission of permissions) {
            roleIdPermissionId.push({ role_id: role.role_id, permission_id: permission.permission_id });
        }

        await models.RolePermission.bulkCreate(roleIdPermissionId, { updateOnDuplicate: ["role_id", "permission_id"] });
    }
    console.log("Permissions are assigned to role successfully");
};

const createAdmin = async () => {
    try {
        const hashedPassword = await utils.hashPassword(config.admin.password);
        let admin = await models.User.findOrCreate({
            where: {
                email: config.admin.email,
            },
            defaults: {
                name: "Admin",
                email: config.admin.email,
                password: hashedPassword,
            },
        });

        admin = admin[0].toJSON();

        const role = await models.Role.findOne({ where: { role_name: roleConstants.SystemAdmin } });

        await models.User.update(
            { role_id: role.role_id },
            {
                where: {
                    user_id: admin.user_id,
                },
            }
        );

        console.log("Admin is created successfully");
    } catch (error) {
        console.error("Error creating admin:", error);
    }
};

export const startup = {
    start,
};
