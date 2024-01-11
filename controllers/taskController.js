import Task from "../models/Task";
import Item from "../models/Item";
import User from "../models/User";

const createTask = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const userId = req.user.id;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const newTask = new Task({
      itemId,
      quantity,
      userId,
    });

    const savedTask = await newTask.save();
    await updateUsersTasks(userId, savedTask._id);

    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { itemId, quantity } = req.body;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const updatedTask = await updateTaskInDatabase(taskId, itemId, quantity);

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Helper function to update user's tasks array
const updateUsersTasks = async (userId, taskId) => {
  try {
    await User.findByIdAndUpdate(userId, { $push: { tasks: taskId } });
  } catch (error) {
    console.error("Error updating user's tasks:", error);
    throw error;
  }
};

// Helper function to update task in the database
const updateTaskInDatabase = async (taskId, itemId, quantity) => {
  try {
    return await Task.findByIdAndUpdate(
      taskId,
      { itemId, quantity },
      { new: true }
    );
  } catch (error) {
    console.error("Error updating task in the database:", error);
    throw error;
  }
};

export default {
  createTask,
  updateTask,
};
