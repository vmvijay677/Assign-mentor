import express from "express";
import { client } from "../index.js";

const router = express.Router();

//getting mentor details
router.get("/", async function (req, res) {
    const mentor = await client
        .db("b30wd")
        .collection("mentor")
        .find({})
        .toArray();
    res.send(mentor);
});

//getting mentor details by mentor name
router.get("/:id", async function (req, res) {
    const { id } = req.params;
    const mentor = await client
        .db("b30wd")
        .collection("mentor")
        .findOne({ mentor_name: id });
    mentor ? res.send(mentor) : res.status(404).send({ message: "Mentor details not found" });
});

//creating mentor details
router.post("/", async function (req, res) {
    const data = req.body;
    const result = await client
        .db("b30wd")
        .collection("mentor")
        .insertMany(data);
    res.send(result);
});

//updating mentor details by mentor name (selecting 1 mentor for assigning multiple students)
router.put("/:id", async function (req, res) {
    const { id } = req.params;
    const updatedMentor = req.body;
    const result = await client
        .db("b30wd")
        .collection("mentor")
        .updateOne({ mentor_name: id }, { $set: updatedMentor });
    res.send(result);
});

export const mentorRouter = router;