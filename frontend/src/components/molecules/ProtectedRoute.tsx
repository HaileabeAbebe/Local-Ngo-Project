import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAppContext(); // get the user from context
  const location = useLocation();

  // If the user is not logged in, not an admin, or not an editor, redirect to home page
  if (!user || (user.role !== "admin" && user.role !== "editor")) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  // If the user is an admin or an editor, render the children components
  return children;
};
export default ProtectedRoute;
