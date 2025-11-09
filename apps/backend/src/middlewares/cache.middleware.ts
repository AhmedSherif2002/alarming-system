import { NextFunction, Request, Response } from "express";
import { RedisServices } from "../services/redis.service";
import HttpStatus from "http-status";

export namespace CacheMiddleware {
    export const cacheMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
        const key = req.originalUrl; // e.g. /alarms
        const cached = await RedisServices.getCache(key);
        console.log("Key:", key, "Cached:", cached);     
           
        if(cached) {
            res.status(HttpStatus.OK).json(cached);
        }else{
            next();
        }
    }
}