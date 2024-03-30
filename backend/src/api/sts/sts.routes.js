import express from "express";

import stsController from "./sts.controller.js";
import { checkAuthentication, checkPermission } from "../../middlewares/auth.middleware.js";
import { permissionConstants as pc } from "../rbac/constants/permissions.constants.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { addManagerSchema, addVehicleDepartureEntrySchema, createStsSchema, updateStsSchema } from "./sts.validation.schema.js";

export const stsRoutes = express.Router();
stsRoutes.post("/", schemaValidator(createStsSchema), stsController.createSts);
stsRoutes.get("/", stsController.findAllSts);
stsRoutes.get("/mine");
stsRoutes.get("/:sts_id");
stsRoutes.put("/:sts_id", schemaValidator(updateStsSchema), stsController.updateSts);
stsRoutes.delete("/:sts_id");

stsRoutes.get("/:sts_id/managers");
stsRoutes.put("/:sts_id/managers", schemaValidator(addManagerSchema), stsController.addManager);
stsRoutes.delete("/:sts_id/managers/manager_id", stsController.removeManager);

stsRoutes.get("/:landfill_id/vehicles", checkPermission(pc.FIND_ALL_VEHICLE_OF_STS));
stsRoutes.put("/:landfill_id/vehicles", checkPermission(pc.ADD_VEHICLE_TO_STS));
stsRoutes.delete("/:landfill_id/vehicles", checkPermission(pc.REMOVE_VEHICLE_FROM_STS));

stsRoutes.post("/:sts_id/vehicle-departure", schemaValidator(addVehicleDepartureEntrySchema), stsController.addVehicleDepartureEntry);
