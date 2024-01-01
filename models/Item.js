import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemName: String,
  type: String,
  energyCost: Number,
  seedCost: Number,
  sellValue: Number,
  favorite: Boolean,
});

itemSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.id;
    delete returnedObject.__v;
  },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
