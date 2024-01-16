// routes/userRouter.js
import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/", userController.createUser);
userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/current", authMiddleware, userController.getCurrentUser);

//Favorites Controller
userRouter.post("/:userId/add-favorite-item", userController.addFavoriteItem);
userRouter.put(
  "/:userId/remove-favorite-item",
  userController.removeFavoriteItem
);

//Task Controller
userRouter.post("/:userId/create-task", userController.createTask);

export default userRouter;
