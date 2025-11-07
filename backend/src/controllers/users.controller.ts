import { Request, Response } from "express";
import { UserModel } from "../models/user";
import HttpStatus from "http-status";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export namespace UsersController {
    export const createUser = async (req: Request, res: Response) => {
        const user = req.body;
        try{
            // Store user in the db and the redis storage
            await UserModel.createUser(user.name, user.email);
            res.status(HttpStatus.CREATED).json({ message: "User was added" });
        }catch(err){
            if(err instanceof PrismaClientKnownRequestError && err.code === 'P2002'){
                res.status(HttpStatus.CONFLICT).json({ error: "Email already exists" });
            }
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
        }
    }

    export const getUsers = async (req: Request, res: Response) => {
        try{
            const users = await UserModel.getUsers();
            res.status(HttpStatus.FOUND).json(JSON.stringify(users))
        }catch(err){
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
        }
    }
}