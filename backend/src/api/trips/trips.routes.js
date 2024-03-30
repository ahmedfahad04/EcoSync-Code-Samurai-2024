import express from "express";

import tripsController from "./trips.controller.js";
import { checkAuthentication } from "../../middlewares/auth.middleware.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { updateTripWithDumpingEntrySchema, findAllTripEntryQuerySchema } from "./trips.validator.schema.js";

export const tripsRoutes = express.Router();

tripsRoutes.get("/", schemaValidator(findAllTripEntryQuerySchema, "query"), tripsController.findAllTripEntry);
tripsRoutes.get("/:trip_id", tripsController.findOneTripEntry);
tripsRoutes.put("/:trip_id", tripsController.updateTripEntry);
tripsRoutes.delete("/:trip_id", tripsController.deleteTripEntry);

tripsRoutes.put("/:trip_id/dumping", schemaValidator(updateTripWithDumpingEntrySchema), tripsController.updateTripWithDumpingEntry);
tripsRoutes.get("/:trip_id/bills", tripsController.generateBill);
