import { Joi } from "../../utils/Joi.js";

export const createUserSchema = Joi.object({
    name: Joi.string().trim().required().min(3).max(30),
    email: Joi.string().trim().email().required().max(50),
    password: Joi.string().trim().required().min(6).max(30),
    role_id: Joi.string().trim().optional().min(1).max(100),
}).required();

export const updateUserSchema = Joi.object({
    name: Joi.string().trim().optional(),
    phone_number: Joi.string().trim().optional(),
}).required();

export const findAllQuerySchema = Joi.object({
    page: Joi.number().integer().positive().optional(),
    limit: Joi.number().integer().positive().optional(),
    name: Joi.string().trim().optional(),
    sort: Joi.string().trim().valid("name").optional(),
    order: Joi.string().trim().valid("ASC", "DESC").optional(),
    role_name: Joi.string().trim().max(100).optional(),
}).required();

export const addRoleSchema = Joi.object({
    role_id: Joi.string().trim().required().min(1).max(100),
}).required();
