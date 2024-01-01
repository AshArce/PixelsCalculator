import mongoose from "mongoose";

mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_URI);

const Item = mongoose.model("Item", itemSchema);

//saving to database
const item1 = new Item({
  itemName: "Popberry seeds",
  type: "seed",
  seedCost: 1,
  energyCost: 3.5,
  sellValue: 3,
  favorite: false,
});

item1.save().then((result) => {
  console.log(result);
  console.log("note saved!");
  mongoose.connection.close();
});

Item.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});

const newItem = {};
