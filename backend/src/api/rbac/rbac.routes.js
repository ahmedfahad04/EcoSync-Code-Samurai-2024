import express from "express";

import rbacController from "./rbac.controller.js";
import { checkAuthentication } from "../../middlewares/auth.middleware.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { addPermissionToRoleSchema } from "./rbac.validation.schema.js";

export const rbacRoutes = express.Router();

// permissions
rbacRoutes.post("/permissions");
rbacRoutes.get("/permissions", rbacController.findAllPermission);
rbacRoutes.get("/permissions/self");
rbacRoutes.get("/permissions/:permission_id");
rbacRoutes.put("/permissions/:permission_id");
rbacRoutes.delete("/permissions/:permission_id");

// roles
rbacRoutes.get("/roles");
rbacRoutes.post("/roles");
rbacRoutes.put("/roles/:role_id");
rbacRoutes.delete("/roles/:role_id");

rbacRoutes.get("/roles/:role_id/permissions");
rbacRoutes.put("/roles/:role_id/permissions", schemaValidator(addPermissionToRoleSchema), rbacController.assignPermissionsToRole);
rbacRoutes.delete("/roles/:role/permissions/:permission_id");
