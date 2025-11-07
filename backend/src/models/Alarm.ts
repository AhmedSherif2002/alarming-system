import { prisma } from "../config/prisma"
import { Alarm } from "../types/alarm.type";

export namespace AlarmModel {
    export const createAlarm = async (sensorName: string) => {
        const alarm = await prisma.alarm.create({ data: { sensorName } });
        return alarm;
    }

    export const getAlarms = async () => {
        const alarms = await prisma.alarm.findMany();
        return alarms;
    }
    
}