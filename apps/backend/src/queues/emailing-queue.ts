import { Queue } from "bullmq";
import connection from "../config/queues.config"; 
import { Alarm } from "@prisma/client";

export namespace EmailingQueue {
    const emailingQueue = new Queue('emailing-queue', { connection: connection });

    export const addJob = async (usersMails: string[], alarm: Alarm) => {
        const alarmJob = {
            usersMails,
            alarm: JSON.stringify(alarm)
        }
        
        console.log("Sending job", alarmJob);
        await emailingQueue.add(`Alarm-${alarm.id}`, alarmJob);
    }   
}