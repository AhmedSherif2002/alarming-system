import { Request, Response } from "express";
import httpStatus from "http-status"

export namespace SensorsController {
    export const getSensors = async (req: Request, res: Response): Promise<void> => {
        // TODO: get sensors from db or redis storage

        res.json({ sensors: [1, 2, 3] });
    }

    export const addSensor = async (req: Request, res: Response): Promise<void> => {
        // TODO: store the new sensor in the db or redis storage

        res.status(httpStatus.OK);
    }

    export const removeSensor = async (req: Request, res: Response): Promise<void> => {
        // TODO: remove the sensor from the db or redis instance
        
        res.status(httpStatus.OK).json({ message: "Sensor was removed succesfully" });
    } 
}