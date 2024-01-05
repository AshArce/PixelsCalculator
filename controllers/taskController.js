import Task from "../models/Task";
import Item from "../models/Item"; // Import the Item model
import User from "../models/User"; // Import the User model

// Controller for handling tasks
const taskController = {
  // Create a new task
  createTask: async (req, res) => {
    try {
      const { itemId, quantity } = req.body;
      const userId = req.user.id; // Assuming you have authentication middleware setting req.user

      // Check if the item exists
      const item = await Item.findById(itemId);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }

      // Create a new task instance
      const newTask = new Task({
        itemId,
        quantity,
        userId,
      });

      // Save the task to the database
      const savedTask = await newTask.save();

      // Update the user's tasks array
      await User.findByIdAndUpdate(userId, { $push: { tasks: savedTask._id } });

      res.status(201).json(savedTask);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Update an existing task
  updateTask: async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const { itemId, quantity } = req.body;

      // Check if the item exists
      const item = await Item.findById(itemId);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }

      // Update the task in the database
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { itemId, quantity },
        { new: true }
      );

      res.status(200).json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default taskController;
