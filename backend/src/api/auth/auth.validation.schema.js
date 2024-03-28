import { Joi } from "../../utils/Joi.js";

export const loginSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().empty().required(),
}).required();

export const initiateResetPasswordSchema = Joi.object({
    email: Joi.string().trim().email().required().max(50),
}).required();

export const confirmResetPasswordSchema = Joi.object({
    email: Joi.string().trim().email().required().max(50),
    otp: Joi.string().trim().required().length(6),
    password: Joi.string().trim().required().min(6).max(30),
}).required();

export const changePasswordSchema = Joi.object({
    old_password: Joi.string().trim().required().min(6).max(30),
    new_password: Joi.string().trim().required().min(6).max(30),
}).required();