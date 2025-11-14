import { transporter } from "../config/nodemailer.config";
import * as nodemailer from "nodemailer";

export namespace EmailingService {
    export const sendEmails = async (usersMails: string[], alarm: any) => {
        const html = `
            <div>
                An alarm has been sent: ${alarm}
            </div>
        `;
        const text = `An alarm has been sent`
        try{
            const info = await transporter.sendMail({
                from: 'ahmedsherif602@gmail.com', // sender address
                to: usersMails, // list of receivers
                subject: "Alarm", // Subject line
                text: text, // plain text body
                html: html, // html body
            });
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }catch(err){
            console.log("Error sending mail", err);
        }
    }
}