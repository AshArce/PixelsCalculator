import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
});

const User = mongoose.model("User", userSchema);

export default User;
