import express from "express";

import { checkPermission } from "../../middlewares/auth.middleware.js";
import { schemaValidator } from "../../middlewares/validation.middleware.js";

export const dashboardRoutes = express.Router();

// should i create separate api endpoint for dashboard ro find summary from relevant apis?
