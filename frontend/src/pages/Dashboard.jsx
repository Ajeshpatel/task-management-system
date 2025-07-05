import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AddTaskForm from "../components/AddTaskForm";
import Filters from "../components/Filters";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    category: "",
  });

  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/tasks", {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/tasks", form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTasks([res.data, ...tasks]);
      setForm({
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        category: "",
      });
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    try {
      const res = await axios.put(
        `https://task-management-system-xx1b.onrender.com/api/tasks/${id}`,
        { status: currentStatus === "pending" ? "completed" : "pending" },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const updated = tasks.map((t) => (t._id === id ? res.data : t));
      setTasks(updated);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${id}`, {
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
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Create New Task</h2>
      <AddTaskForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Filters
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        categoryFilter={categoryFilter}
        setStatusFilter={setStatusFilter}
        setPriorityFilter={setPriorityFilter}
        setCategoryFilter={setCategoryFilter}
      />
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Your Tasks</h2>
      <TaskList
        tasks={tasks}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        categoryFilter={categoryFilter}
        handleStatusChange={handleStatusChange}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Dashboard;
