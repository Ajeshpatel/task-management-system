const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
  .post(protect, createTask)    // Create task
  .get(protect, getTasks);      // Get all tasks (with pagination)

router.route("/:id")
  .get(protect, getTaskById)    // Get single task
  .put(protect, updateTask)     // Update task
  .delete(protect, deleteTask); // Delete task

module.exports = router;
