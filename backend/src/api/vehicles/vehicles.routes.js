import express from "express";

import vehiclesController from "./vehicles.controller.js";
import { checkPermission } from "../../middlewares/auth.middleware.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { createVehicleSchema, updateVehicleSchema } from "./vehicles.validation.schema.js";
import { permissionConstants as pc } from "../rbac/constants/permissions.constants.js";

export const vehicleRoutes = express.Router();
vehicleRoutes.post(
    "/",
    checkPermission(pc.CREATE_VEHICLE),
    schemaValidator(createVehicleSchema),
    vehiclesController.createVehicle
);
vehicleRoutes.get("/", checkPermission(pc.FIND_ALL_VEHICLE), vehiclesController.findAllVehicle);

vehicleRoutes.get(
    "/available",
    checkPermission(pc.FIND_ALL_AVAILABLE_VEHICLE),
    vehiclesController.findAllAvailableVehicle
);
vehicleRoutes.get("/:vehicle_id", checkPermission(pc.FIND_ONE_VEHICLE), vehiclesController.findOneVehicle);

vehicleRoutes.put(
    "/:vehicle_id",
    checkPermission(pc.UPDATE_VEHICLE),
    schemaValidator(updateVehicleSchema),
    vehiclesController.updateVehicle
);
vehicleRoutes.delete("/:vehicle_id", checkPermission(pc.DELETE_VEHICLE), vehiclesController.deleteVehicle);

vehicleRoutes.post("/:vehicl_id/driver");
vehicleRoutes.delete("/:vehicl_id/driver");

