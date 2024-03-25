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

export const initiateResetPasswordSchema = Joi.object({
    email: Joi.string().trim().email().required().max(50),
}).required();

export const confirmResetPasswordSchema = Joi.object({
    email: Joi.string().trim().email().required().max(50),
    otp: Joi.string().trim().required().length(6),
    password: Joi.string().trim().required().min(6).max(30),
}).required();