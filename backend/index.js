import "express-async-errors";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

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
import { tripsRoutes } from "./src/api/trips/trips.routes.js";
import { rbacRoutes } from "./src/api/rbac/rbac.routes.js";
import { vehicleDepartureRoutes } from "./src/api/vehicle-departure/vehicle-departure.routes.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(config.cookie.secret));

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/rbac", rbacRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/sts", stsRoutes);
app.use("/api/landfills", landfillRoutes);
app.use("/api/trips", tripsRoutes);
app.use("/api/vehicle-departure", vehicleDepartureRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(config.api_server_port, () => {
    console.log(`API Server listening on port ${config.api_server_port}...`);
    initializeMySqlConnection();
});
