import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });

  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Fetch all tasks on load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("https://task-management-system-xx1b.onrender.com/api/tasks", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, [user]);

  // Handle input change for add form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(""https://task-management-system-xx1b.onrender.com/api/tasks", form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTasks([res.data, ...tasks]);
      setForm({ title: "", description: "", dueDate: "", priority: "medium" });
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  // Status toggle handler
  const handleStatusChange = async (id, currentStatus) => {
    try {
      const res = await axios.put(
        `https://task-management-system-xx1b.onrender.com/api/tasks/${id}`,
        { status: currentStatus === "pending" ? "completed" : "pending" },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const updatedTasks = tasks.map((t) => (t._id === id ? res.data : t));
      setTasks(updatedTasks);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`https://task-management-system-xx1b.onrender.com/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* ====== Add Task Form ====== */}
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Create New Task</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-8 bg-white p-4 rounded shadow"
      >
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        ></textarea>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
        >
          Add Task
        </button>
      </form>

      {/* ====== Filter Section ====== */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* ====== Task List ====== */}
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Your Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks found.</p>
      ) : (
        <ul className="space-y-4">
          {tasks
            .filter((task) => {
              if (statusFilter !== "all" && task.status !== statusFilter)
                return false;
              if (priorityFilter !== "all" && task.priority !== priorityFilter)
                return false;
              return true;
            })
            .map((task) => (
              <li
                key={task._id}
                className={`p-4 rounded-md shadow border-l-4 relative ${
                  task.priority === "high"
                    ? "border-red-500"
                    : task.priority === "medium"
                    ? "border-yellow-400"
                    : "border-green-500"
                }`}
              >
                {/* <h3 className="font-semibold text-lg">{task.title}</h3> */}
                <h3
                  className="font-semibold text-lg text-blue-600 hover:underline cursor-pointer"
                  onClick={() => navigate(`/task/${task._id}`)}
                >
                  {task.title}
                </h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-xs text-gray-400">
                  Due: {task.dueDate?.slice(0, 10)}
                </p>

                <span
                  className={`text-xs mt-1 inline-block px-2 py-1 rounded cursor-pointer ${
                    task.status === "completed"
                      ? "bg-green-200"
                      : "bg-yellow-200"
                  }`}
                  onClick={() => handleStatusChange(task._id, task.status)}
                >
                  {task.status}
                </span>

                <button
                  className="absolute top-2 right-2 text-sm text-red-500 hover:underline"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>

                <button
                  className="absolute top-2 right-20 text-sm text-blue-600 hover:underline"
                  onClick={() => navigate(`/edit/${task._id}`)}
                >
                  Edit
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
