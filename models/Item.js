import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  itemType: {
    type: String,
    required: true,
  },
  energyCost: {
    type: Number,
    required: true,
  },
  seedCost: {
    type: Number,
    required: true,
  },
  sellValue: {
    type: Number,
    required: true,
  },
  favorite: Boolean,
});

itemSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
