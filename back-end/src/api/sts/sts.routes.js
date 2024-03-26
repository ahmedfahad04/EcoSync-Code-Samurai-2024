import express from "express";

import stsController from "./sts.controller.js";
import { checkAuthentication } from "../../middlewares/auth.middleware.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { createStsSchema, updateStsSchema } from "./sts.validation.schema.js";

export const stsRoutes = express.Router();
stsRoutes.post("/", schemaValidator(createStsSchema), stsController.createSts);
stsRoutes.put("/:sts_id", schemaValidator(updateStsSchema), stsController.updateSts);

stsRoutes.put("/:sts_id/manager", stsController.addManager);
stsRoutes.delete("/:sts_id/manager", stsController.removeManager);
