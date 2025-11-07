import express, { Request, Response } from "express"
import { AlarmsController } from "../controllers";
import { CacheMiddleware } from "../middlewares/cache.middleware";


const alarmsRouter = express.Router();

alarmsRouter.get("/", CacheMiddleware.cacheMiddleWare, AlarmsController.getAlarms);
alarmsRouter.post("/", AlarmsController.pushAlarm);

export default alarmsRouter