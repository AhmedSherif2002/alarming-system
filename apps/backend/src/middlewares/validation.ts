import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status";

export namespace ValidationMiddleware {
    export const validateUser = (req: Request, res: Response, next: NextFunction) => {
        console.log("request body: ", req.body);
        const { name, email } = req.body;
        if(!name || !email){
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "Missing fields" });
        }
        next();
    }
}