import { createClient } from "redis"

export namespace RedisServices {
    export const redisClient = createClient()

    export const init = async () => {
        await redisClient.connect(); 
    }

    export const getCache = async (key: string = "alarms") => {
        const cached = await redisClient.get(key) || null;
        return cached;
    }

    export const setCache = async (key: string, value: string) => {
        await redisClient.set(key, value, { expiration: { type: "EX", value: 3600 } });
    }

    export const deleteCache = async (key: string) => {
        await redisClient.del(key);
    }
}