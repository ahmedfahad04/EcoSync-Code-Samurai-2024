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
    page: Joi.number().integer().positive(),
    limit: Joi.number().integer().positive(),
}).required();

export const addRoleSchema = Joi.object({
    role_id: Joi.string().trim().required().min(1).max(100),
}).required();
