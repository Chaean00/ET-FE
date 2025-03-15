import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

export const ProtectedRoute = () => {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicRoute = () => {
  const { token } = useAuth();
  return !token ? <Outlet /> : <Navigate to="/town" replace />;
};
