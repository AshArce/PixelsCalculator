// user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  favoriteItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  tasks: [
    {
      quantity: {
        type: Number,
        required: true,
      },
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
      itemName: String,
      energyCost: Number,
      seedCost: Number,
      sellValue: Number,
    },
  ],
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
