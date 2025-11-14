import { Request, Response } from "express";
import { AlarmEventService } from "../services/event.service";
import { AlarmModel } from "../models/Alarm";
import HttpStatus from "http-status";
import { RedisServices } from "../services/redis.service";
import { EmailingQueue } from "../queues/emailing-queue";
import { UserModel } from "../models/user";

export namespace AlarmsController {
    export const getAlarms = async (req: Request, res: Response): Promise<void> => {
        try{
            // fecth all alarms from db or redis storage
            const alarms = await AlarmModel.getAlarms();
            // cache the alarms
            const cacheKey = req.originalUrl;
            RedisServices.setCache(cacheKey, JSON.stringify(alarms));

            res.status(HttpStatus.OK).json(JSON.stringify(alarms));
        }catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
        }
    }

    export const pushAlarm = async (req: Request, res: Response): Promise<void> => {
        const { sensorName } = req.body;
        try{
            console.log("sensorName:", sensorName)
            // store the alarms to db
            const alarm = await AlarmModel.createAlarm(sensorName)
            // broadcast event to all clients
            AlarmEventService.broadcastEvent(alarm);
            // remove cached alarms
            RedisServices.deleteCache("alarms");
            const users = await UserModel.getUsers(); // fetch all users on the system
            // Trigger emailing service to send mails to all users
            const usersMails = users.map(user => user.email);
            EmailingQueue.addJob(usersMails, alarm);
            res.status(HttpStatus.CREATED).json({ message: "Alarm received succesfully" });
        }catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
        }
    } 
}