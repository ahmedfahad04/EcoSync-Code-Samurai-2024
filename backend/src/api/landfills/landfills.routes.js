import express from "express";

import landfillsController from "./landfills.controller.js";
import { checkPermission } from "../../middlewares/auth.middleware.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { permissionConstants as pc } from "../rbac/constants/permissions.constants.js";
import { addManagerSchema, createLandfillSchema, updateLandfillSchema } from "./landfills.validator.schema.js";

export const landfillRoutes = express.Router();

landfillRoutes.post(
    "/",
    checkPermission(pc.CREATE_LANDFILL),
    schemaValidator(createLandfillSchema),
    landfillsController.createLandfill
);
landfillRoutes.get("/", checkPermission(pc.FIND_ALL_LANDFILL), landfillsController.findAllLandfill);

landfillRoutes.get("/mine", checkPermission(pc.FIND_ALL_MY_LANDFILL), landfillsController.findMyLandfills);

landfillRoutes.get("/:landfill_id", checkPermission(pc.FIND_ONE_LANDFILL), landfillsController.findOneLandfill);
landfillRoutes.put(
    "/:landfill_id",
    checkPermission(pc.UPDATE_LANDFILL),
    schemaValidator(updateLandfillSchema),
    landfillsController.updateLandfill
);
landfillRoutes.delete("/:landfill_id", checkPermission(pc.DELETE_LANDFILL), landfillsController.deleteLandfill);

landfillRoutes.get(
    "/:landfill_id/managers",
    checkPermission(pc.FIND_ALL_MANAGER_OF_LANDFILL),
    landfillsController.findAllLandfillManager
);
landfillRoutes.put(
    "/:landfill_id/managers",
    checkPermission(pc.ADD_MANAGER_TO_LANDFILL),
    schemaValidator(addManagerSchema),
    landfillsController.addManager
);
landfillRoutes.delete(
    "/:landfill_id/managers/:manager_id",
    checkPermission(pc.REMOVE_MANAGER_FROM_LANDFILL),
    landfillsController.removeManager
);

landfillRoutes.get(
    "/:landfill_id/trips",
    checkPermission(pc.FIND_ALL_TRIP_ENTRY_OF_LANDFILL),
    landfillsController.findAllTripOfLandfill
);
