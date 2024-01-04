// routes/userRouter.js
import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", userController.createUser);
userRouter.get("/", userController.getUsers);
userRouter.post("/login", userController.loginUser);
userRouter.put(
  "/users/:userId/favoriteItems",
  userController.updateUserFavorites
);

export default userRouter;
