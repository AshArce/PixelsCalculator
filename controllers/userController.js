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

    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
    const user = await User.findOne({ username }).populate("favoriteItems");
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
      .json({ token, username: user.username, name: user.name, id: user._id });
  } catch (error) {
    next(error);
  }
}

async function getFavoriteItems(req, res, next) {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).populate("favoriteItems");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.favoriteItems);
  } catch (error) {}
}

async function addFavoriteItem(req, res, next) {
  const userId = req.params.userId;
  const itemId = req.body.itemId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Received itemId:", itemId);

    // Check if the item exists
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if the item is already in the user's favoriteItems
    if (user.favoriteItems.includes(itemId)) {
      return res.status(200).json(user); // Item is already in favorites, no need to add again
    }

    // Add the item to the user's favoriteItems
    user.favoriteItems.push(itemId);

    // Use a Set to remove duplicate item IDs
    user.favoriteItems = [...new Set(user.favoriteItems)];

    await user.save();

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
  const { itemId, quantity } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the item in the database
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Create a task object with item properties
    const task = {
      itemId: item.id,
      itemName: item.itemName,
      itemType: item.itemType,
      energyCost: item.energyCost,
      sellValue: item.sellValue,
      quantity: quantity || 1, // Use the provided quantity or default to 1
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

async function deleteTask(req, res, next) {
  const userId = req.params.userId;
  const taskIdToRemove = req.body.taskId;
  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the task from the user's tasks
    user.tasks = user.tasks.filter(
      (task) => task._id.toString() !== taskIdToRemove
    );
    await user.save();

    return res.status(200).json(user.tasks);
  } catch (error) {
    next(error);
  }
}

async function updateTask(req, res, next) {
  const userId = req.params.userId;
  const taskIdToUpdate = req.params.taskId;
  const { quantity } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the task in the user's tasks
    const taskToUpdate = user.tasks.find(
      (task) => task._id.toString() === taskIdToUpdate
    );

    if (!taskToUpdate) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update task properties
    taskToUpdate.quantity = quantity || taskToUpdate.quantity;
    // Update other task properties if needed
    // taskToUpdate.otherProperty = otherPropertiesToUpdate;

    await user.save();

    return res.status(200).json(taskToUpdate);
  } catch (error) {
    next(error);
  }
}

export default {
  createUser,
  getUsers,
  getUser,
  loginUser,
  getFavoriteItems,
  addFavoriteItem,
  removeFavoriteItem,
  createTask,
  deleteTask,
  updateTask,
};
