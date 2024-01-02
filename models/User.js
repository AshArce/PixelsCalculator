import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
});

userSchema.plugin(mongooseUniqueValidator);

const User = mongoose.model("User", userSchema);

export default User;
