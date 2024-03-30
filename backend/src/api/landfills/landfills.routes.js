import express from "express";

import landfillsController from "./landfills.controller.js";
import { checkAuthentication, checkPermission } from "../../middlewares/auth.middleware.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { permissionConstants as pc } from "../rbac/constants/permissions.constants.js";
import {
    addManagerSchema,
    addDumpingEntrySchema,
    createLandfillSchema,
    updateLandfillSchema,
    attachVehicleSchema,
} from "./landfills.validator.schema.js";

export const landfillRoutes = express.Router();

landfillRoutes.post(
    "/",
    // checkPermission(pc.CREATE_LANDFILL),
    schemaValidator(createLandfillSchema),
    landfillsController.createLandfill
);
landfillRoutes.get("/", checkPermission(pc.FIND_ALL_LANDFILL), landfillsController.findAllLandfill);

landfillRoutes.get("/mine", landfillsController.findMyLandfills);

landfillRoutes.get("/:landfill_id", checkPermission(pc.FIND_ONE_LANDFILL), landfillsController.findOneLandfill);
landfillRoutes.put(
    "/:landfill_id",
    // checkPermission(pc.UPDATE_LANDFILL),
    schemaValidator(updateLandfillSchema),
    landfillsController.updateLandfill
);
landfillRoutes.delete(
    "/:landfill_id",
    // checkPermission(pc.DELETE_LANDFILL),
    landfillsController.deleteLandfill
);

landfillRoutes.get(
    "/:landfill_id/managers",
    checkPermission(pc.FIND_ALL_MANAGER_OF_LANDFILL),
    landfillsController.findAllLandfillManager
);
landfillRoutes.put("/:landfill_id/managers", schemaValidator(addManagerSchema), landfillsController.addManager);
landfillRoutes.delete("/:landfill_id/managers/:manager_id", landfillsController.removeManager);

// may would be removed
landfillRoutes.get("/:landfill_id/vehicles");
landfillRoutes.put("/:landfill_id/vehicles", schemaValidator(attachVehicleSchema), landfillsController.attachVehicleToLandfill);
landfillRoutes.delete("/:landfill_id/vehicles", landfillsController.removeVehicleFromLandfill);

landfillRoutes.get("/:landfill_id/trips", landfillsController.findAllTripOfLandfill);
