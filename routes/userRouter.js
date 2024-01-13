// routes/userRouter.js
import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", userController.createUser);
userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/:userId/add-favorite-item", userController.addFavoriteItem);
userRouter.put(
  "/:userId/remove-favorite-item",
  userController.removeFavoriteItem
);

export default userRouter;
