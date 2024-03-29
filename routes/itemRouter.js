import express from "express";
import itemController from "../controllers/itemController.js";

const itemRouter = express.Router();

itemRouter.get("/", itemController.getItems);
itemRouter.get("/:id", itemController.getItem);
itemRouter.delete("/:id", itemController.deleteItem);
itemRouter.post("/", itemController.createItem);
itemRouter.put("/:id", itemController.updateItem);

export default itemRouter;
