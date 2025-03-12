import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

// 로그인한 사용자만 접근 가능하게 함
export const ProtectedRoute = () => {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

// 로그인하지 않은 사용자만 접근 가능하게 함
export const PublicRoute = () => {
  const { token } = useAuth();
  return !token ? <Outlet /> : <Navigate to="/town" replace />;
};
