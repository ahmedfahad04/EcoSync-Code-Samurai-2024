import express from "express";

import landfillsController from "./landfills.controller.js";
import { checkAuthentication } from "../../middlewares/auth.middleware.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { addManagerSchema, addDumpingEntrySchema, createlandfillSchema, updatelandfillSchema } from "./landfills.validator.schema.js";

export const landfillRoutes = express.Router();
landfillRoutes.post("/", schemaValidator(createlandfillSchema), landfillsController.createLanfill);
landfillRoutes.put("/:landfill_id", schemaValidator(updatelandfillSchema), landfillsController.updateLanfill);

landfillRoutes.put("/:landfill_id/manager", schemaValidator(addManagerSchema), landfillsController.addManager);
landfillRoutes.delete("/:landfill_id/manager", landfillsController.removeManager);

landfillRoutes.post("/:landfill_id/dumping", schemaValidator(addDumpingEntrySchema), landfillsController.addDumpingEntry);
