import express from "express";

import rbacController from "./rbac.controller.js";
import { checkAuthentication } from "../../middlewares/auth.middleware.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { addPermissionToRoleSchema, createRoleSchema, updateRoleSchema } from "./rbac.validation.schema.js";

export const rbacRoutes = express.Router();

// permissions
rbacRoutes.get("/permissions", rbacController.findAllPermission);
rbacRoutes.get("/permissions/:permission_id", rbacController.findOnePermission);

// roles
rbacRoutes.get("/roles", rbacController.findAllRole);
rbacRoutes.post("/roles", schemaValidator(createRoleSchema), rbacController.createOneRole);
rbacRoutes.get("/roles/:role_id", rbacController.findOneRole);
rbacRoutes.put("/roles/:role_id", schemaValidator(updateRoleSchema), rbacController.updateRole);
rbacRoutes.delete("/roles/:role_id", rbacController.deleteRole);

rbacRoutes.get("/roles/:role_id/permissions", rbacController.findAllPermissionOfRole);
rbacRoutes.put("/roles/:role_id/permissions", schemaValidator(addPermissionToRoleSchema), rbacController.assignPermissionsToRole);
rbacRoutes.delete("/roles/:role_id/permissions/:permission_id", rbacController.removePermissionFromRole);
