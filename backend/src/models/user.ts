import { Request, Response } from "express";
import { prisma } from "../config/prisma"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export namespace UserModel {
    export const createUser = async (name: string, email: string): Promise<void> => {
        await prisma.user.create({ data: { name: name, email: email } });
    }

    export const getUsers = async () => {
        const users = await prisma.user.findMany(); 
        return users
    }
}