import express from "express";

import landfillsController from "./landfills.controller.js";
import { checkAuthentication } from "../../middlewares/auth.middleware.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { addManagerSchema, addDumpingEntrySchema, createlandfillSchema, updatelandfillSchema, attachVehicleSchema } from "./landfills.validator.schema.js";

export const landfillRoutes = express.Router();

landfillRoutes.post("/", schemaValidator(createlandfillSchema), landfillsController.createLanfill);
landfillRoutes.get("/", landfillsController.findAllLandfill);
landfillRoutes.get("/:landfill_id", landfillsController.findOneLandfill);
landfillRoutes.put("/:landfill_id", schemaValidator(updatelandfillSchema), landfillsController.updateLanfill);

landfillRoutes.get("/:landfill_id/managers", landfillsController.findAllLandfillManager);
landfillRoutes.put("/:landfill_id/managers", schemaValidator(addManagerSchema), landfillsController.addManager);
landfillRoutes.delete("/:landfill_id/managers", landfillsController.removeManager);

landfillRoutes.post("/:landfill_id/truck-dumping", schemaValidator(addDumpingEntrySchema), landfillsController.addDumpingEntry);

landfillRoutes.put("/:landfill_id/vehicles", schemaValidator(attachVehicleSchema), landfillsController.attachVehicleToLandfill);
landfillRoutes.delete("/:landfill_id/vehicles", landfillsController.removeVehicleFromLandfill);
