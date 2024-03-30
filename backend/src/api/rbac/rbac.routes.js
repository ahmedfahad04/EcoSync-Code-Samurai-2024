import express from "express";

import rbacController from "./rbac.controller.js";
import { checkAuthentication } from "../../middlewares/auth.middleware.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { addPermissionToRoleSchema, createRoleSchema } from "./rbac.validation.schema.js";

export const rbacRoutes = express.Router();

// permissions
rbacRoutes.get("/permissions", rbacController.findAllPermission);
rbacRoutes.get("/permissions/:permission_id");

// roles
rbacRoutes.get("/roles", rbacController.findAllRole);
rbacRoutes.post("/roles", schemaValidator(createRoleSchema), rbacController.createOneRole);
rbacRoutes.put("/roles/:role_id");
rbacRoutes.delete("/roles/:role_id", rbacController.deleteRole);

rbacRoutes.get("/roles/:role_id/permissions", rbacController.findAllPermissionOfRole);
rbacRoutes.put("/roles/:role_id/permissions", schemaValidator(addPermissionToRoleSchema), rbacController.assignPermissionsToRole);
rbacRoutes.delete("/roles/:role/permissions/:permission_id");
