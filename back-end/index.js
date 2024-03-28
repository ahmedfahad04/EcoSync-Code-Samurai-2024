import "express-async-errors";
import express from "express";
import cookieParser from "cookie-parser";

import { initializeMySqlConnection } from "./src/configs/mysql.js";
import { notFoundHandler } from "./src/middlewares/not-found-handler.middleware.js";
import { globalErrorHandler } from "./src/middlewares/global-error-handler.middleware.js";

import { config } from "./src/configs/config.js";
import { authRoutes } from "./src/api/auth/auth.routes.js";
import { usersRoutes } from "./src/api/users/users.routes.js";
import { profileRoutes } from "./src/api/profile/profile.routes.js";
import { vehicleRoutes } from "./src/api/vehicles/vehicles.routes.js";
import { stsRoutes } from "./src/api/sts/sts.routes.js";
import { landfillRoutes } from "./src/api/landfills/landfills.routes.js";
import { truckDumpingRoutes } from "./src/api/truck-dumping/truck-dumping.routes.js";
import { rbacRoutes } from "./src/api/rbac/rbac.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(config.cookie.secret));

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/sts", stsRoutes);
app.use("/api/landfills", landfillRoutes);
app.use("/api/truck-dumping", truckDumpingRoutes);
app.use("/api/rbac", rbacRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(config.api_server_port, () => {
    console.log(`API Server listening on port ${config.api_server_port}...`);
    initializeMySqlConnection();
});
