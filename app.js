import express from "express";
import morgan from "morgan";
import cors from "cors";
import itemRouter from "../Backend/routes/itemRouter.js";
import unknownEndpoint from "./middlewares/unknownEndpoint.js";
import connectToDB from "./utility/connectToDB.js";
import errorHandler from "./middlewares/errorHandler.js";
import config from "./utility/config.js";
import userRouter from "./routes/userRouter.js";

const MONGODB_URI = config.MONGODB_URI;
const app = express();
connectToDB(MONGODB_URI);

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(morgan(":method :url :status :body"));

app.use("/users", userRouter);
app.use("/item", itemRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
