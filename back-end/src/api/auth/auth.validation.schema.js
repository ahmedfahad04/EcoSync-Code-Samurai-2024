import { Joi } from "../../utils/Joi.js";

export const loginSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().empty().required(),
}).required();

export const signUpSchema = Joi.object({
    name: Joi.string().trim().required().min(3).max(30),
    email: Joi.string().trim().email().required().max(50),
    password: Joi.string().trim().required().min(6).max(30),
}).required();
