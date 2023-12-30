import express from "express";
import itemController from "../controllers/itemController";
const itemRouter = express.Router;

itemRouter.get("/info", itemController.getItemInfo);
itemRouter.get("/", itemController.getItems);
itemRouter.get("/:id", itemController.getItemById);
itemRouter.delete("/:id", itemController.deleteItem);
itemRouter.post("/", itemController.createItem);
itemRouter.patch("/:id", itemController.patchFavorite);
