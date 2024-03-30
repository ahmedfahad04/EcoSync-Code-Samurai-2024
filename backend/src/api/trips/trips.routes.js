import express from "express";

import tripsController from "./trips.controller.js";
import { checkPermission } from "../../middlewares/auth.middleware.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { updateTripWithDumpingEntrySchema, findAllTripEntryQuerySchema } from "./trips.validator.schema.js";
import { permissionConstants as pc } from "../rbac/constants/permissions.constants.js";

export const tripsRoutes = express.Router();

tripsRoutes.get(
    "/",
    checkPermission(pc.FIND_ALL_TRIP_ENTRY),
    schemaValidator(findAllTripEntryQuerySchema, "query"),
    tripsController.findAllTripEntry
);
tripsRoutes.get("/:trip_id", checkPermission(pc.FIND_ONE_TRIP_ENTRY), tripsController.findOneTripEntry);
tripsRoutes.put("/:trip_id", checkPermission(pc.UPDATE_TRIP_ENTRY), tripsController.updateTripEntry);
tripsRoutes.delete("/:trip_id", checkPermission(pc.DELETE_TRIP_ENTRY), tripsController.deleteTripEntry);

tripsRoutes.put(
    "/:trip_id/dumping",
    checkPermission(pc.UPDATE_TRIP_WITH_DUMPING_ENTRY),
    schemaValidator(updateTripWithDumpingEntrySchema),
    tripsController.updateTripWithDumpingEntry
);
tripsRoutes.get("/:trip_id/bills", checkPermission(pc.GENERATE_BILL_FOR_DUMPING_ENTRY), tripsController.generateBill);
