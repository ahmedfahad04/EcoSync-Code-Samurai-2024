import express from "express";


import authController from "./auth.controller.js";

import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { signUpSchema, loginSchema } from "./auth.validation.schema.js";

export const authRoutes = express.Router();
authRoutes.post("/signup", schemaValidator(signUpSchema), authController.signup);
authRoutes.post("/login", schemaValidator(loginSchema), authController.login);
authRoutes.delete("/logout", authController.logout);