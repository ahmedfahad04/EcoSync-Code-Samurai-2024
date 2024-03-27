import express from "express";

import dumpingController from "./dumping.controller.js";
import { checkAuthentication } from "../../middlewares/auth.middleware.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";

export const dumpingRoutes = express.Router();
dumpingRoutes.get("/:dumping_id/bill", dumpingController.generateBill);


