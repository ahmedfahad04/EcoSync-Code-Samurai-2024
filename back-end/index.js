import "express-async-errors";
import express from "express";
import cookieParser from "cookie-parser";

import { initializeMySqlConnection } from "./src/configs/mysql.js";
import { notFoundHandler } from "./src/middlewares/not-found-handler.middleware.js";
import { globalErrorHandler } from "./src/middlewares/global-error-handler.middleware.js";

import { config } from "./src/configs/config.js";
import { authRoutes } from "./src/api/auth/auth.routes.js";
// import usersRoutes from "./src/api/users/users.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(config.cookie.secret));

app.use("/api/auth", authRoutes);
// app.use("/api/users", usersRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(config.port, () => {
    console.log(`API Server listening on port ${config.api_server_port}...`);
    initializeMySqlConnection();
});
