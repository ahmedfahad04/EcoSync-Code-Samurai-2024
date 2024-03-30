import express from "express";

import rbacController from "./rbac.controller.js";
import { checkPermission } from "../../middlewares/auth.middleware.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { addPermissionToRoleSchema, createRoleSchema, updateRoleSchema } from "./rbac.validation.schema.js";
import { permissionConstants as pc } from "./constants/permissions.constants.js";

export const rbacRoutes = express.Router();

// permissions
rbacRoutes.get("/permissions", checkPermission(pc.FIND_ALL_PERMISSION), rbacController.findAllPermission);
rbacRoutes.get(
    "/permissions/:permission_id",
    checkPermission(pc.FIND_ONE_PERMISSION),
    rbacController.findOnePermission
);

// roles
rbacRoutes.get("/roles", checkPermission(pc.FIND_ALL_ROLE), rbacController.findAllRole);
rbacRoutes.post(
    "/roles",
    checkPermission(pc.CREATE_ROLE),
    schemaValidator(createRoleSchema),
    rbacController.createOneRole
);
rbacRoutes.get("/roles/:role_id", checkPermission(pc.FIND_ONE_ROLE), rbacController.findOneRole);
rbacRoutes.put(
    "/roles/:role_id",
    checkPermission(pc.UPDATE_ROLE),
    schemaValidator(updateRoleSchema),
    rbacController.updateRole
);
rbacRoutes.delete("/roles/:role_id", checkPermission(pc.UPDATE_ROLE), rbacController.deleteRole);

rbacRoutes.get(
    "/roles/:role_id/permissions",
    checkPermission(pc.FIND_ALL_PERMISSION_OF_ROLE),
    rbacController.findAllPermissionOfRole
);
rbacRoutes.put(
    "/roles/:role_id/permissions",
    checkPermission(pc.ADD_PERMISSION_TO_ROLE),
    schemaValidator(addPermissionToRoleSchema),
    rbacController.assignPermissionsToRole
);
rbacRoutes.delete(
    "/roles/:role_id/permissions/:permission_id",
    checkPermission(pc.REMOVE_PERMISSION_FROM_ROLE),
    rbacController.removePermissionFromRole
);
