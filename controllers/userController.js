import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import config from "../utility/config.js";

async function getUsers(req, res) {
  const users = await User.find({});
  return res.json(users);
}
async function createUser(req, res, next) {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();

    return res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
}

async function loginUser(req, res, next) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, config.JWT_SECRET);
    console.log("Generated token:", token);

    return res
      .status(200)
      .json({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
}
export default {
  createUser,
  getUsers,
  loginUser,
};
