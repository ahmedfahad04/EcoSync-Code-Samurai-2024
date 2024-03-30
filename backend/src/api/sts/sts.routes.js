import express from "express";

import stsController from "./sts.controller.js";
import { checkAuthentication, checkPermission } from "../../middlewares/auth.middleware.js";
import { permissionConstants as pc } from "../rbac/constants/permissions.constants.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { addManagerSchema, addVehicleDepartureEntrySchema, createStsSchema, updateStsSchema } from "./sts.validation.schema.js";
import { addVehicleToStsSchema } from "../vehicles/vehicles.validation.schema.js";

export const stsRoutes = express.Router();
stsRoutes.post("/", schemaValidator(createStsSchema), stsController.createSts);
stsRoutes.get("/", stsController.findAllSts);
stsRoutes.get("/mine", stsController.findMySts);
stsRoutes.get("/:sts_id", stsController.findOneSts);
stsRoutes.put("/:sts_id", schemaValidator(updateStsSchema), stsController.updateSts);
stsRoutes.delete("/:sts_id", stsController.deleteSts);

stsRoutes.get("/:sts_id/managers", stsController.findAllStsManager);
stsRoutes.put("/:sts_id/managers", schemaValidator(addManagerSchema), stsController.addManager);
stsRoutes.delete("/:sts_id/managers/:manager_id", stsController.removeManager);

stsRoutes.get(
    "/:sts_id/vehicles",
    // checkPermission(pc.FIND_ALL_VEHICLE_OF_STS),
    stsController.findAllVehicleOfSts
);
stsRoutes.put(
    "/:sts_id/vehicles",
    // checkPermission(pc.ADD_VEHICLE_TO_STS),
    schemaValidator(addVehicleToStsSchema),
    stsController.addVehicleToSTS
);
stsRoutes.delete(
    "/:sts_id/vehicles/:vehicle_id",
    // checkPermission(pc.REMOVE_VEHICLE_FROM_STS),
    stsController.removeVehicleFromSts
);

stsRoutes.post("/:sts_id/trips", schemaValidator(addVehicleDepartureEntrySchema), stsController.addTripEntry);
stsRoutes.get("/:sts_id/trips", stsController.findAllTripEntryOfSts);