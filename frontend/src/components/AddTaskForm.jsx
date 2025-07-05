import React from "react";

const AddTaskForm = ({ form, handleChange, handleSubmit }) => (
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
    />
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
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded"
      >
        <option value="">Select Category</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="React.js">React.js</option>
        <option value="Database">Database</option>
      </select>
    </div>
    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
    >
      Add Task
    </button>
  </form>
);

export default AddTaskForm;
