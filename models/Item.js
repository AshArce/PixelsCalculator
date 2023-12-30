import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemName: String,
  type: String,
  energyCost: Number,
  seedCost: Number,
  sellValue: Number,
  favorite: Boolean,
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
