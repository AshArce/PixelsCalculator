import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import config from "../utility/config.js";
import Item from "../models/Item.js";

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

async function addFavoriteItem(req, res, next) {
  const userId = req.params.userId;
  const itemId = req.body.itemId; // Assuming you send the itemId in the request body

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the item exists
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Add the item to the user's favoriteItems
    if (!user.favoriteItems.includes(itemId)) {
      user.favoriteItems.push(itemId);
      await user.save();
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function removeFavoriteItem(req, res, next) {
  const userId = req.params.userId;
  const itemIdToRemove = req.body.itemId;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the item from the user's favoriteItems
    user.favoriteItems = user.favoriteItems.filter(
      (itemId) => itemId.toString() !== itemIdToRemove
    );
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function createTask(req, res, next) {
  const userId = req.params.userId;
  const { itemId } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch item details from the database
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Create a task object with item properties
    const task = {
      itemId: item._id,
      itemName: item.itemName,
      energyCost: item.energyCost,
      sellValue: item.sellValue,
      // ... other task properties ...
    };

    // Add the task to the user's tasks
    user.tasks.push(task);
    await user.save();

    return res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

export default {
  createUser,
  getUsers,
  getUser,
  loginUser,
  addFavoriteItem,
  removeFavoriteItem,
  createTask,
};
