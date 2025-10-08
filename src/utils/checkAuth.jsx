import { Navigate } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Check if the user role matches the required role
  if (user.role !== "coordinator" && user.role !== "contributor" && user.role !== "developer") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default CheckAuth;
