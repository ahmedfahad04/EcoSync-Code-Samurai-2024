import express from "express";

import truckDumpingController from "./truck-dumping.controller.js";
import { checkAuthentication } from "../../middlewares/auth.middleware.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";

export const truckDumpingRoutes = express.Router();

truckDumpingRoutes.get("/", truckDumpingController.findAllTruckDumpingEntry);
truckDumpingRoutes.get("/:dumping_id/bills", truckDumpingController.generateBill);


