import { Router } from "express";
import { ValidationMiddleware } from "../middlewares/validation";
import { UsersController } from "../controllers";

export const usersRouter = Router()

usersRouter.post("/", ValidationMiddleware.validateUser, UsersController.createUser);
usersRouter.get("/", UsersController.getUsers);