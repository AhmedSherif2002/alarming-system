import { Request, Response } from "express";
import { AlarmEventService } from "../services/event.service";
import { AlarmModel } from "../models/Alarm";
import HttpStatus from "http-status";
import { RedisServices } from "../services/redis.service";

export namespace AlarmsController {
    export const getAlarms = async (req: Request, res: Response): Promise<void> => {
        try{
            // fecth all alarms from db or redis storage
            const alarms = await AlarmModel.getAlarms();
            res.status(HttpStatus.OK).json(JSON.stringify(alarms));
            // cache the alarms
            RedisServices.setCache("alarms", JSON.stringify(alarms));
        }catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
        }
    }

    export const pushAlarm = async (req: Request, res: Response): Promise<void> => {
        const { sensorName } = req.body;
        try{
            // store the alarms to db
            const alarm = await AlarmModel.createAlarm(sensorName)
            // broadcast event to all clients
            AlarmEventService.broadcastEvent(alarm);
            // remove cached alarms
            RedisServices.deleteCache("alarms");
            res.status(HttpStatus.CREATED).json({ message: "Alarm received succesfully" });
        }catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
        }
    } 
}