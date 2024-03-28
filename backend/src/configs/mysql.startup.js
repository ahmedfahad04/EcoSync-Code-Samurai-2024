import { config } from "./config.js";
import { roleConstants } from "./../api/rbac/constants/roles.constants.js";
import { models } from "./mysql.js";
import utils from "../utils/utils.js";

const start = async () => {
    await createRoles();
    await createAdmin();
};

const createRoles = async () => {
    try {
        const rolesToCreate = Object.values(roleConstants).map((roleName) => ({
            role_name: roleName,
        }));
        await models.Role.bulkCreate(rolesToCreate, { updateOnDuplicate: ["role_name"] });
        console.log("Roles are created successfully");
    } catch (error) {
        console.error("Error creating roles:", error);
    }
};

const createPermissions = async () => {};

const assignPermissionToRoles = async () => {};

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
