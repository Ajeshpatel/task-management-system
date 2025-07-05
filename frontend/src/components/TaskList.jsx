import React from "react";
import { useNavigate } from "react-router-dom";

const TaskList = ({
  tasks,
  statusFilter,
  priorityFilter,
  categoryFilter,
  handleStatusChange,
  handleDelete,
}) => {
  const navigate = useNavigate();

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter !== "all" && task.status !== statusFilter) return false;
    if (priorityFilter !== "all" && task.priority !== priorityFilter)
      return false;
    if (categoryFilter !== "all" && task.category !== categoryFilter)
      return false;
    return true;
  });

  return (
    <ul className="space-y-4">
      {filteredTasks.map((task) => (
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
          <p className="text-xs text-gray-500">Category: {task.category}</p>

          <span
            className={`text-xs mt-1 inline-block px-2 py-1 rounded cursor-pointer ${
              task.status === "completed" ? "bg-green-200" : "bg-yellow-200"
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
  );
};

export default TaskList;
