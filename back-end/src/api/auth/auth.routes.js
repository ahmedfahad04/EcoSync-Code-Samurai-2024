import express from "express";

import authController from "./auth.controller.js";

import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { signUpSchema, loginSchema } from "./auth.validation.schema.js";

export const authRoutes = express.Router();
authRoutes.post("/create", schemaValidator(signUpSchema), authController.signup);
authRoutes.post("/login", schemaValidator(loginSchema), authController.login);
authRoutes.delete("/logout", authController.logout);

authRoutes.post("/reset-password/initiate");
authRoutes.post("/reset-password/confirm");

authRoutes.post("/change-password")