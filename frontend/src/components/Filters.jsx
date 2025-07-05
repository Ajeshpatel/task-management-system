import React from "react";

const Filters = ({
  statusFilter,
  priorityFilter,
  categoryFilter,
  setStatusFilter,
  setPriorityFilter,
  setCategoryFilter,
}) => (
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
    <select
      value={categoryFilter}
      onChange={(e) => setCategoryFilter(e.target.value)}
      className="px-3 py-2 border rounded"
    >
      <option value="all">All Categories</option>
      <option value="Frontend">Frontend</option>
      <option value="Backend">Backend</option>
      <option value="React.js">React.js</option>
      <option value="Database">Database</option>
    </select>
  </div>
);

export default Filters;
