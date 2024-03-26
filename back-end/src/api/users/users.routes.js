import express from "express";

import usersController from "./users.controller.js";
import { checkAuthentication } from "../../middlewares/auth.middleware.js";

import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { addRoleSchema, createUserSchema, findAllQuerySchema, updateUserSchema } from "./users.validation.schema.js";

export const usersRoutes = express.Router();

usersRoutes.post("/", schemaValidator(createUserSchema), usersController.create);

usersRoutes.get("/", schemaValidator(findAllQuerySchema, "query"), usersController.findAll);
usersRoutes.get("/roles", usersController.findAvailableRoles);
usersRoutes.get("/:user_id", usersController.findOne);

usersRoutes.put("/:user_id", schemaValidator(updateUserSchema), usersController.update);
usersRoutes.put("/:user_id/roles", schemaValidator(addRoleSchema), usersController.addRole);

usersRoutes.delete("/:user_id", usersController.deleteUser);

// usersRoutes.get("/profile", checkAuthentication, usersController.getProfile);
