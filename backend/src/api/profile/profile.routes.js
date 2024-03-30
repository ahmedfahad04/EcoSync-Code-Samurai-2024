import express from "express";

import profileController from "./profile.controller.js";

import { checkPermission } from "../../middlewares/auth.middleware.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { updateUserSchema } from "../users/users.validation.schema.js";
import { permissionConstants as pc } from "../rbac/constants/permissions.constants.js";

export const profileRoutes = express.Router();
profileRoutes.get("/", checkPermission(pc.FIND_PROFILE), profileController.getProfile);
profileRoutes.put("/", checkPermission(pc.UPDATE_PROFILE), schemaValidator(updateUserSchema), profileController.updateProfile);
