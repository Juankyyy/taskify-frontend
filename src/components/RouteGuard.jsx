import { Navigate } from "react-router-dom";

export const RouteGuard = ({ children, requiresAuth }) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token; // Doble negación para convertir a booleano

  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (!requiresAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};