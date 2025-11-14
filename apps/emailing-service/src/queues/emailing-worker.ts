import { Job, Worker } from "bullmq";
import connection from "../config/queues.config";
import { EmailingService } from "../services/emailing.service";

export namespace EmailingWorker{
    const emailingWorkerProcessor = async (job: Job) => {
        console.log("Job received:", job.data);
        const mails = job.data.usersMails;
        const alarm = job.data.alarm
        EmailingService.sendEmails(mails, alarm);
    }
    export const init = async () => {
        const emailingWorker = new Worker('emailing-queue', emailingWorkerProcessor, { connection: connection });
        
        emailingWorker.on('error', err => {
            console.error("emailing worker error:", err);
        });
        
        emailingWorker.on('completed', (job, returnValue) => {
            console.log("job has successfully completed:", job.id);
        });

        const isRunning = emailingWorker.isRunning();
        if(isRunning) console.log("Emailing worker is running");
    }
}