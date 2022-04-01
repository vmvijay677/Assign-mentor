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
    res.send("<h1>Mentor and Student Assigning API</h1> \n<h3>1. For mentor details use, /mentor</h3> \n<h3>2. For specific mentor details use, /mentor/:mentor_name</h3> \n<h3>3. For student details use, /student</h3> \n<h3>4. For specific student details use, /student/:student_name</h3>");
});

app.use("/mentor", mentorRouter);

app.use("/student", studentRouter);

app.listen(port, () => {
    console.log(`Server started in ${port}`);
});
