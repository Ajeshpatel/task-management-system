import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useAuth(); // context se user aur setter le rahe
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // localStorage se user hatao
    setUser(null); // context se bhi user hatao
    navigate("/login"); // login page pe redirect
  };

  if (!user) return null; // agar user nahi hai to navbar hi na dikhao

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <div className="flex items-center space-x-4">
        <span className="font-medium">{user.name}</span>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-3 py-1 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
