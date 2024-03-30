import express from "express";

import authController from "./auth.controller.js";

import { checkPermission, checkLoginPermission } from "../../middlewares/auth.middleware.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { permissionConstants as pc } from "../rbac/constants/permissions.constants.js";
import {
    loginSchema,
    initiateResetPasswordSchema,
    confirmResetPasswordSchema,
    changePasswordSchema,
} from "./auth.validation.schema.js";

export const authRoutes = express.Router();
authRoutes.post("/login", checkLoginPermission, schemaValidator(loginSchema), authController.login);
authRoutes.delete("/logout", authController.logout);

authRoutes.post("/reset-password/initiate", schemaValidator(initiateResetPasswordSchema), authController.initiateResetPassword);
authRoutes.post("/reset-password/confirm", schemaValidator(confirmResetPasswordSchema), authController.confirmResetPassword);

authRoutes.post("/change-password", checkPermission(pc.CHANGE_PASSWORD), schemaValidator(changePasswordSchema), authController.changePassword);
