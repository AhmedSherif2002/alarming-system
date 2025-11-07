import { Request, Response } from "express";
import { AlarmEventService } from "../services/event.service";

export namespace EventController {
    export const event = async (req: Request, res: Response): Promise<void> => {
        const headers = { 
            "Content-Type": "text/event-strem",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
        res.writeHead(200, headers);

        res.write("data: this is the event\n\n");

        const clientId = AlarmEventService.addClient(res);

        req.on('close', () => {
            console.log("client disconnected");
            AlarmEventService.removeClient(clientId);
        })
    }
}