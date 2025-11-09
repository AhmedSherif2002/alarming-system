import express, { Request, Response } from "express";
import cors from "cors"
import routes from "./routes";
import { RedisServices } from "./services/redis.service";

const bootstrap = async () => {
    const app = express();
    app.use(express.json());
    // app.use(cors);
    app.use(routes)
    
    await RedisServices.init();
    
    if(RedisServices.redisClient.isReady){
        console.log("Redis is running");
    }

    app.get("/", (req: Request, res: Response) => {
        res.status(200).json({ message: "successful" });
    })
    
    app.listen(3000, () => {
        console.log("Server is running on port:", 3000)
    })
}

bootstrap();