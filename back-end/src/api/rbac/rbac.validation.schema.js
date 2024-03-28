import { Joi } from "../../utils/Joi.js";

export const addPermissionToRoleSchema = Joi.object({
    permission_names: Joi.array().items(Joi.string().trim().max(100)).max(50).required(),
});