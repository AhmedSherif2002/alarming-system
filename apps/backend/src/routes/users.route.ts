import { Router } from "express";
import { ValidationMiddleware } from "../middlewares/validation";
import { UsersController } from "../controllers";
import { CacheMiddleware } from "../middlewares/cache.middleware";

export const usersRouter = Router()

usersRouter.post("/", ValidationMiddleware.validateUser, UsersController.createUser);
usersRouter.get("/", CacheMiddleware.cacheMiddleWare, UsersController.getUsers);