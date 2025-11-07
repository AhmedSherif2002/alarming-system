import express, { Request, Response } from "express";
import cors from "cors"
import routes from "./routes";

const app = express();
app.use(express.json());
// app.use(cors);
app.use(routes)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "succesful" });
})

app.listen(3000, () => {
    console.log("Server is running on port:", 3000)
})