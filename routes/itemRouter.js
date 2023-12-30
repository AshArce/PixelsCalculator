import express from "express";
import itemController from "../controllers/itemController.js";

const itemRouter = express.Router();

itemRouter.get("/info", itemController.getItemInfo);
itemRouter.get("/", itemController.getItems);
itemRouter.get("/:id", itemController.getItems);
itemRouter.delete("/:id", itemController.deleteItem);
itemRouter.post("/", itemController.createItem);
itemRouter.patch("/:id", itemController.updateFavorite);

export default itemRouter;
