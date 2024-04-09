import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate replace to="/login" />;
  }

  return children;
};

// Mock authentication (replace with your actual implementation)
const useAuth = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Replace with your logic
  return { isLoggedIn };
};
