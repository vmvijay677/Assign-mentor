import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";
import { mentorRouter } from "./routes/mentor.js";
import { studentRouter } from "./routes/student.js";

dotenv.config()
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected 👍");
    return client;
}
export const client = await createConnection();

app.get("/", function(req, res){
    res.send("Hello World");
});

app.use("/mentor", mentorRouter);

app.use("/student", studentRouter);

app.listen(port, () => {
    console.log(`Server started in ${port}`);
});
