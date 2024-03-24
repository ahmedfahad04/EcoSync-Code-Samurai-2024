import express from "express";

const usersRoutes = express.Router();

import usersController from "./users.controller.js";
import { checkAuthentication } from "../../middlewares/auth.middleware.js";

import { schemaValidator } from "../../middlewares/validation.middleware.js";

usersRoutes.post("/", usersController.create);
usersRoutes.get("/", usersController.findAll);
usersRoutes.get("/profile", checkAuthentication, usersController.getProfile);
usersRoutes.get("/:user_id", usersController.findOne);
usersRoutes.put("/:user_id", checkAuthentication, usersController.update);
usersRoutes.delete("/:user_id", usersController.remove);

export default usersRoutes;
