import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Agar user login hai to children dikhaye, warna /login bhej do
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
