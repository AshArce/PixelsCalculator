import express from "express";
import landController from "../controllers/landController.js";

const landRouter = express.Router();

landRouter.get("/", landController.getLands);
landRouter.get("/:id", landController.getLand);
landRouter.delete("/:id", landController.deleteLand);
landRouter.post("/", landController.createLand);
landRouter.put("/:id", landController.updateLand);

export default landRouter;
