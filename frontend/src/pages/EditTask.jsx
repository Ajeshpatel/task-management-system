import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const EditTask = () => {
  const { id } = useParams(); // task ID from URL
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "pending",
    category: "",
  });

  // Fetch task data when page loads
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`https://task-management-system-xx1b.onrender.com/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = res.data;
        setForm({
          title: data.title,
          description: data.description,
          dueDate: data.dueDate?.slice(0, 10), // for input type="date"
          priority: data.priority,
          status: data.status,
          category: data.category,
        });
      } catch (err) {
        console.error("Failed to load task", err);
      }
    };

    fetchTask();
  }, [id, user]);

  // Handle field change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://task-management-system-xx1b.onrender.com/api/tasks/${id}`, form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      // After update, redirect to dashboard
      navigate("/");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          Edit Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Task Title"
            required
            className="w-full px-4 py-2 border rounded"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select Category</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="React.js">React.js</option>
            <option value="Database">Database</option>
          </select>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
