import express from "express";
import { client } from "../index.js";

const router = express.Router();

//getting student details
router.get("/", async function (req, res) {
    const student = await client
        .db("b30wd")
        .collection("student")
        .find({})
        .toArray();
    res.send(student);
});

//getting student details by student name
router.get("/:id", async function (req, res) {
    const { id } = req.params;
    const student = await client
        .db("b30wd")
        .collection("student")
        .findOne({ student_name: id });
    student ? res.send(student) : res.status(404).send({ message: "Student details not found" });
});

//creating students details
router.post("/", async function (req, res) {
    const data = req.body;
    const result = await client
        .db("b30wd")
        .collection("student")
        .insertMany(data);
    res.send(result);
});

//updating student details by student name (selecting 1 student and assigning mentor, if the mentor is not assigned for that student)
router.put("/:id", async function (req, res) {
    const { id } = req.params;
    const updatedStudent = req.body;
    const result = await client
        .db("b30wd")
        .collection("student")
        .updateOne({ student_name: id }, { $set: updatedStudent });
    res.send(result);
});

export const studentRouter = router;