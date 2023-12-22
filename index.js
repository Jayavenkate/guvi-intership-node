import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const port = 4000;
const app = express();
const Mongo_url = "mongodb+srv://jaya:jaya123@cluster0.q8ola8v.mongodb.net";
export const client = new MongoClient(Mongo_url);
await client.connect();
console.log("Mongo is connected");
app.use(cors());
app.use(express.json());

app.get("/", async function (req, res) {
  res.send("hello world guvi internship");
});

//post

app.post("/create", async function (req, res) {
  const createdata = req.body;
  console.log(createdata);
  const result = await client
    .db("b42wd2")
    .collection("internship")
    .insertOne(createdata);
  res.status(200).send({ message: "create task successfully", result });
});
//get

app.get("/read", async function (req, res) {
  try {
    const result = await client
      .db("b42wd2")
      .collection("internship")
      .find({})
      .toArray();
    res.status(200).send(result);
  } catch (err) {
    res.status(401).send({ message: err });
  }
});

//delete

app.delete("/:id", async function (req, res) {
  const { _id } = req.params;
  const result = await client
    .db("b42wd2")
    .collection("internship")
    .deleteOne({ id: _id });
  console.log(result);
  result.deletedCount >= 1
    ? res.send({ message: "deleted successfully" })
    : res.send({ message: "users not found" });
});

//put

app.put("/:id", async function (req, res) {
  const { _id } = req.params;
  const data = req.body;
  console.log(data);
  const result = await client
    .db("b42wd2")
    .collection("internship")
    .updateOne({ id: _id }, { $set: data });
  res.send(result);
});

//getbyid

app.get("/:id", async function (req, res) {
  const { _id } = req.params;
  try {
    const result = await client
      .db("b42wd2")
      .collection("internship")
      .findOne({ id: _id });
    console.log(result);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: "Resource not found" });
    }
  } catch (err) {
    console.log(err);
  }
});
app.listen(port, () => {
  console.log(`App is listening in the Port ${port}`);
});
