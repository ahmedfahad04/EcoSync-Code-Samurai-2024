import express from "express";

import stsController from "./sts.controller.js";
import { checkPermission } from "../../middlewares/auth.middleware.js";
import { permissionConstants as pc } from "../rbac/constants/permissions.constants.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";
import {
    addManagerSchema,
    addVehicleDepartureEntrySchema,
    createStsSchema,
    updateStsSchema,
} from "./sts.validation.schema.js";
import { addVehicleToStsSchema } from "../vehicles/vehicles.validation.schema.js";

export const stsRoutes = express.Router();
stsRoutes.post("/", checkPermission(pc.CREATE_STS), schemaValidator(createStsSchema), stsController.createSts);
stsRoutes.get("/", checkPermission(pc.FIND_ALL_STS), stsController.findAllSts);
stsRoutes.get("/mine", checkPermission(pc.FIND_ALL_MY_STS), stsController.findMySts);
stsRoutes.get("/:sts_id", checkPermission(pc.FIND_ONE_STS), stsController.findOneSts);
stsRoutes.put("/:sts_id", checkPermission(pc.UPDATE_STS), schemaValidator(updateStsSchema), stsController.updateSts);
stsRoutes.delete("/:sts_id", checkPermission(pc.UPDATE_STS), stsController.deleteSts);

stsRoutes.get("/:sts_id/managers", checkPermission(pc.FIND_ALL_MANAGER_OF_STS), stsController.findAllStsManager);
stsRoutes.put(
    "/:sts_id/managers",
    checkPermission(pc.ADD_MANAGER_TO_STS),
    schemaValidator(addManagerSchema),
    stsController.addManager
);
stsRoutes.delete(
    "/:sts_id/managers/:manager_id",
    checkPermission(pc.REMOVE_MANAGER_FROM_STS),
    stsController.removeManager
);

stsRoutes.get("/:sts_id/vehicles", checkPermission(pc.FIND_ALL_VEHICLE_OF_STS), stsController.findAllVehicleOfSts);
stsRoutes.put(
    "/:sts_id/vehicles",
    checkPermission(pc.ADD_VEHICLE_TO_STS),
    schemaValidator(addVehicleToStsSchema),
    stsController.addVehicleToSTS
);
stsRoutes.delete(
    "/:sts_id/vehicles/:vehicle_id",
    checkPermission(pc.REMOVE_VEHICLE_FROM_STS),
    stsController.removeVehicleFromSts
);

// vehicle departure
stsRoutes.post(
    "/:sts_id/trips",
    checkPermission(pc.CREATE_VEHICLE_DEPARTURE_TRIP_ENTRY),
    schemaValidator(addVehicleDepartureEntrySchema),
    stsController.addTripEntry
);
stsRoutes.get("/:sts_id/trips", checkPermission(pc.FIND_ALL_TRIP_ENTRY_OF_STS), stsController.findAllTripEntryOfSts);

// find optimal route from sts to any landfill
stsRoutes.get("/:sts_id/routes")