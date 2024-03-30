import { Joi } from "../../utils/Joi.js";

export const createRoleSchema = Joi.object({
    role_name: Joi.string().trim().max(100).required(),
    description: Joi.string().trim().max(400).optional(),
});

export const updateRoleSchema = Joi.object({
    role_name: Joi.string().trim().max(100).optional(),
    description: Joi.string().trim().max(400).optional(),
});

export const addPermissionToRoleSchema = Joi.object({
    permission_names: Joi.array().items(Joi.string().trim().max(100)).max(50).required(),
});
