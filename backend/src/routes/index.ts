import { Router } from "express";
import alarmsRouter from "./alarms.route";
import eventRouter from "./event.route";
import sensorsRouter from "./sensors.route";
import { usersRouter } from "./users.route";

const routes = Router();

routes.use("/alarms", alarmsRouter);
routes.use("/event", eventRouter);
routes.use("/sensors", sensorsRouter);
routes.use("/users", usersRouter)


export default routes