import express from "express"
import { EventController } from "../controllers";

const eventRouter = express.Router();

eventRouter.get("/", EventController.event)

export default eventRouter
