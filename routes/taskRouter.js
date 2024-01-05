// Import necessary modules and controllers
import express from "express";
import taskController from "./controllers/taskController";
import authMiddleware from "../middlewares/authMiddleware";

const taskRouter = express.Router();

// Define routes for task operations
taskRouter.post("/", authMiddleware, taskController.createTask);
taskRouter.put("/:taskId", authMiddleware, taskController.updateTask);

export default taskRouter;
