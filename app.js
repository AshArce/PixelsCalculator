import express from "express";
import morgan from "morgan";
import cors from "cors";
import itemRouter from "../Backend/routes/itemRouter.js";
import unknownEndpoint from "./utility/unknownEndpoint.js";
import dotenv from "dotenv";
import connectToDB from "./utility/connectToDB.js";

dotenv.config();

console.log(process.env.MONGODB_URI);
const MONGODB_URI = process.env.MONGODB_URI;
const app = express();

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(morgan(":method :url :status :body"));

app.use("/item", itemRouter);

app.use(unknownEndpoint);
connectToDB(MONGODB_URI);

export default app;
