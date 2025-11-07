import { Request, Response } from "express";
import { AlarmEventService } from "../services/event.service";
import { AlarmModel } from "../models/Alarm";
import HttpStatus from "http-status";

export namespace AlarmsController {
    export const getAlarms = async (req: Request, res: Response): Promise<void> => {
        try{
            // TODO: fecth all alarms from db or redis storage
            const alarms = await AlarmModel.getAlarms();
            res.status(HttpStatus.OK).json(JSON.stringify(alarms));
        }catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
        }
    }

    export const pushAlarm = async (req: Request, res: Response): Promise<void> => {
        const { sensorName } = req.body;
        try{
            // TODO: store the alarms to db or redis storage
            const alarm = await AlarmModel.createAlarm(sensorName)
            // broadcast event to all clients
            AlarmEventService.broadcastEvent(alarm);
            res.status(HttpStatus.CREATED).json({ message: "Alarm received succesfully" });
        }catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
        }
    } 
}