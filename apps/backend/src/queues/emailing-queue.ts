import { Queue } from "bullmq";
import connection from "../config/queues.config"; 
import { Alarm } from "@prisma/client";

export namespace EmailingQueue {
    const emailingQueue = new Queue('emailing-queue', { connection: connection });

    export const addJob = async (alarm: Alarm) => {
        console.log("Sending job", alarm.id);
        await emailingQueue.add(`Alarm-${alarm.id}`, alarm);
    }   
}