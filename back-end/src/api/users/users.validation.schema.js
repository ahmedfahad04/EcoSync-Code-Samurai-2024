import { Joi } from "../../utils/Joi.js";

export const createUserSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().empty().required(),
}).required();

export const updateUserSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
    // roles: Joi.string().trim().required().valid("admin", "user"),
}).required();