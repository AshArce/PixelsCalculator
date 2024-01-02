import bcrypt from "bcrypt";
import User from "../models/User.js";

async function createUser(req, res, next) {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  return res.status(201).json(savedUser);
}

export default {
  createUser,
};
