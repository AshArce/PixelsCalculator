import express from "express";
import morgan from "morgan";
import cors from "cors";
import app from "./app.js";

const PORT = process.env.PORT || 3001;

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :status :body"));

app.get("/", (req, res) => {
  return res.send("<h1>Pixels Calculator Backend</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
