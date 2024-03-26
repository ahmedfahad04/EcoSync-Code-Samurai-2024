import express from "express";

import profileController from "./profile.controller.js";

import { checkAuthentication } from "../../middlewares/auth.middleware.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { updateUserSchema } from "../users/users.validation.schema.js";

export const profileRoutes = express.Router();
profileRoutes.get("/", checkAuthentication, profileController.getProfile);
profileRoutes.put("/", checkAuthentication, schemaValidator(updateUserSchema), profileController.updateProfile);
