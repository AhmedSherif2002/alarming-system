import { EmailingWorker } from "./emailing-worker";
export * from "./emailing-worker";

export namespace Queues {
    export const init = async () => {
        await EmailingWorker.init();
    }
}