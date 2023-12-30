import express from "express";
import morgan from "morgan";
import cors from "cors";
import itemRouter from "../Backend/routes/itemRouter.js";
import unknownEndpoint from "./utility/unknownEndpoint.js";
import dotenv from "dotenv";
import connectToDB from "./utility/connectToDB.js";

dotenv.config();

console.log(process.env.MONGODB_URI);
const MONGODB_URL = process.env.MONGODB_URI;
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :status :body"));

app.use("/item", itemRouter);

app.use(unknownEndpoint);
connectToDB(MONGODB_URL);

export default app;
