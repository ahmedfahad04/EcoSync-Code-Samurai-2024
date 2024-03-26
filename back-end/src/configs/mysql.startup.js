import { RoleTypes } from "../models/Role.js";
import { models } from "./mysql.js";

const createRoles = async () => {
    try {
        const rolesToCreate = Object.values(RoleTypes).map((roleName) => ({
            role_name: roleName,
        }));
        await models.Role.bulkCreate(rolesToCreate, { updateOnDuplicate: ["role_name"] });
        console.log("Roles created successfully");
    } catch (error) {
        console.error("Error creating roles:", error);
    }
};

const createPermissions = async () => {};

const assignPermissionToRoles = async () => {}

const createAdmin= async () => {
    
}

export const startup = {
    createRoles,
    createPermissions,
};
