import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const TaskDetails = () => {
  const { id } = useParams(); // URL se task ID
  const { user } = useAuth();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);

  // Load task from backend by ID
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setTask(res.data);
      } catch (err) {
        console.error("Failed to fetch task:", err);
      }
    };

    fetchTask();
  }, [id, user]);

  if (!task) return <p className="text-center mt-20">Loading task...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">{task.title}</h2>
        <p className="mb-2 text-gray-700">
          <span className="font-semibold">Description:</span> {task.description}
        </p>
        <p className="mb-2 text-gray-700">
          <span className="font-semibold">Due Date:</span>{" "}
          {task.dueDate?.slice(0, 10)}
        </p>
        <p className="mb-2 text-gray-700">
          <span className="font-semibold">Priority:</span>{" "}
          <span className="capitalize">{task.priority}</span>
        </p>
        <p className="mb-4 text-gray-700">
          <span className="font-semibold">Status:</span>{" "}
          <span className="capitalize">{task.status}</span>
        </p>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate(`/edit/${task._id}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Task
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
