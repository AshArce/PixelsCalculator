import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import config from "../utility/config.js";

async function getUsers(_req, res) {
  const users = await User.find({});
  return res.json(users);
}

async function getUser(req, res, next) {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!User) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.json(user);
  } catch (error) {
    next(error);
  }
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

// Update favoriteItems for a user
async function updateUserFavorites(req, res, next) {
  const userId = req.params.id;
  console.log(userId);
  const { itemName } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's favoriteItems array
    user.favoriteItems = itemName;

    // Save the updated user
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export default {
  createUser,
  getUsers,
  getUser,
  loginUser,
  updateUserFavorites,
};
