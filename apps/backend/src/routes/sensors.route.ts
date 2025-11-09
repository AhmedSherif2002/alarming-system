import { Router } from "express";
import { SensorsController } from "../controllers";

const sensorsRouter = Router();

sensorsRouter.get("/", SensorsController.getSensors);
sensorsRouter.post("/", SensorsController.addSensor);
sensorsRouter.delete("/", SensorsController.removeSensor);

export default sensorsRouter