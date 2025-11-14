import { transporter } from "../config/nodemailer.config";
import * as nodemailer from "nodemailer";

export namespace EmailingService {
    export const sendEmails = async (usersMails: string[]) => {
        try{
            const info = await transporter.sendMail({
                from: 'ahmedsherif602@gmail.com', // sender address
                to: "youssefsherif2450@gmail.com", // list of receivers
                subject: "Hello", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
            });
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }catch(err){
            console.log("Error sending mail", err);
        }
    }
}