// routes/userRouter.js
import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", userController.createUser);
userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUser);

userRouter.post("/login", userController.loginUser);
userRouter.put("/users/:id/favoriteItems", userController.updateUserFavorites);

export default userRouter;
