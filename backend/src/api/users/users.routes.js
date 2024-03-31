import express from "express";

import usersController from "./users.controller.js";
import { checkPermission } from "../../middlewares/auth.middleware.js";

import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { addRoleSchema, createUserSchema, findAllQuerySchema, updateUserSchema } from "./users.validation.schema.js";
import { permissionConstants as pc } from "../rbac/constants/permissions.constants.js";

export const usersRoutes = express.Router();

usersRoutes.post("/", checkPermission(pc.CREATE_USER), schemaValidator(createUserSchema), usersController.create);

usersRoutes.get(
    "/",
    checkPermission(pc.FIND_ALL_USER),
    schemaValidator(findAllQuerySchema, "query"),
    usersController.findAll
);
usersRoutes.get("/roles", checkPermission(pc.FIND_ALL_ROLE), usersController.findAvailableRoles);
usersRoutes.get("/:user_id", checkPermission(pc.FIND_ONE_USER), usersController.findOne);

usersRoutes.put(
    "/:user_id",
    checkPermission(pc.UPDATE_USER),
    schemaValidator(updateUserSchema),
    usersController.update
);
usersRoutes.delete("/:user_id", checkPermission(pc.DELETE_USER), usersController.deleteUser);

usersRoutes.put(
    "/:user_id/roles",
    checkPermission(pc.ADD_ROLE_TO_USER),
    schemaValidator(addRoleSchema),
    usersController.addRole
);
usersRoutes.delete("/:user_id/roles", checkPermission(pc.REMOVE_ROLE_FROM_USER), usersController.removeRole);
