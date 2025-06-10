import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import PrivateRoute from "./utils/PrivateRoute";
import EditTask from "./pages/EditTask";
import TaskDetails from "./pages/TaskDetails";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id" // 👈 New route for Edit Task
          element={
            <PrivateRoute>
              <EditTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/task/:id"
          element={
            <PrivateRoute>
              <TaskDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
