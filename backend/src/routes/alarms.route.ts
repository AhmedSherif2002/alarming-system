import express, { Request, Response } from "express"
import { AlarmsController } from "../controllers";


const alarmsRouter = express.Router();

alarmsRouter.get("/", AlarmsController.getAlarms);
alarmsRouter.post("/", AlarmsController.pushAlarm);

export default alarmsRouter