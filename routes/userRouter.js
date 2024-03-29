// routes/userRouter.js
import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", userController.createUser);
userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUser);
userRouter.post("/login", userController.loginUser);

// Favorites Controller
userRouter.get("/:userId/favorite-items", userController.getFavoriteItems);
userRouter.post("/:userId/add-favorite-item", userController.addFavoriteItem);
userRouter.delete(
  "/:userId/remove-favorite-item",
  userController.removeFavoriteItem
);

// Task Controller
userRouter.post("/:userId/create-task", userController.createTask);
userRouter.get("/:userId/tasks", userController.getTasks);
userRouter.delete("/:userId/delete-task", userController.deleteTask);
userRouter.put("/:userId/update-task/:taskId", userController.updateTask);

export default userRouter;
