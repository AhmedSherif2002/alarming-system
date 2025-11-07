import { Response } from "express";
import { Alarm } from "../types/alarm.type";
import { Client } from "../types/client.type";

export namespace AlarmEventService {
    let clients: Client[] = [];

    export const addClient = (response: Response): string => {
        const clientId = clients.length.toString();
        const client: Client = {
            id: clientId.toString(),
            response
        }
        clients.push(client);
        return clientId;
    } 

    export const broadcastEvent = (alarm: Alarm): void => {
        const { sensorName } = alarm;
        clients.forEach(client => client.response.write(`event: alarm\n data: sensor ${sensorName}\n\n`));
    } 

    export const removeClient = (clientId: string): void => {
        clients = clients.filter(client => client.id !== clientId);
    } 
}