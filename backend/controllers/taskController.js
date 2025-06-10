const Task = require("../models/Task");

// Create New Task
const createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  try {
    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      dueDate,
      priority,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: "Task creation failed", err });
  }
};

// Get All Tasks of Logged-in User
const getTasks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;

  try {
    const tasks = await Task.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", err });
  }
};

// Get Single Task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error getting task", err });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error updating task", err });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", err });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
