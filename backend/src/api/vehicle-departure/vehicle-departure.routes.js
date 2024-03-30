import express from "express";

import vehicleDepartureController from "./vehicle-departure.controller.js";
import { checkAuthentication } from "../../middlewares/auth.middleware.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";
import { findAllDepartureEntryQuerySchema } from "./vehicle-departure.validator.schema.js";

export const vehicleDepartureRoutes = express.Router();
vehicleDepartureRoutes.get(
    "/",
    schemaValidator(findAllDepartureEntryQuerySchema, "query"),
    vehicleDepartureController.findAllDepartureEntry
);
vehicleDepartureRoutes.get("/:departure_id");
vehicleDepartureRoutes.put("/:departure_id");
vehicleDepartureRoutes.delete("/:departure_id", vehicleDepartureController.deleteDepartureEntry);
