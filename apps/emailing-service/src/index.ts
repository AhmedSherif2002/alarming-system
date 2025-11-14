import { Queues } from "./queues";

const bootstrap = async () => {
    await Queues.init();
}

bootstrap();
