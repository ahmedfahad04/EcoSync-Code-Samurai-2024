import express from "express";

import vehiclesController from "./vehicles.controller.js";
import { checkAuthentication } from "../../middlewares/auth.middleware.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { createVehicleSchema, updateVehicleSchema } from "./vehicles.validation.schema.js";

export const vehicleRoutes = express.Router();
vehicleRoutes.post("/", schemaValidator(createVehicleSchema), vehiclesController.createVehicle);
vehicleRoutes.get("/", vehiclesController.findAllVehicle);

vehicleRoutes.get("/available", vehiclesController.findAllAvailableVehicle);
vehicleRoutes.get("/:vehicle_id", vehiclesController.findOneVehicle);

vehicleRoutes.put("/:vehicle_id", schemaValidator(updateVehicleSchema), vehiclesController.updateVehicle);
vehicleRoutes.delete("/:vehicle_id", vehiclesController.deleteVehicle);
