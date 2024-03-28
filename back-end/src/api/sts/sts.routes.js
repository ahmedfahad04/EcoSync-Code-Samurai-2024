import express from "express";

import stsController from "./sts.controller.js";
import { checkAuthentication } from "../../middlewares/auth.middleware.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { addManagerSchema, addVehicleDepartureEntrySchema, createStsSchema, updateStsSchema } from "./sts.validation.schema.js";

export const stsRoutes = express.Router();
stsRoutes.post("/", schemaValidator(createStsSchema), stsController.createSts);
stsRoutes.get("/", stsController.findAllSts);
stsRoutes.get("/:sts_id");
stsRoutes.put("/:sts_id", schemaValidator(updateStsSchema), stsController.updateSts);
stsRoutes.delete("/:sts_id");

stsRoutes.get("/:sts_id/managers");
stsRoutes.put("/:sts_id/managers", schemaValidator(addManagerSchema), stsController.addManager);
stsRoutes.delete("/:sts_id/managers/manager_id", stsController.removeManager);

stsRoutes.post("/:sts_id/vehicle-departure", schemaValidator(addVehicleDepartureEntrySchema), stsController.addVehicleDepartureEntry);
