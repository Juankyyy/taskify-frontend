import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export const RouteGuard = ({ children, requiresAuth }) => {
  const { user } = useUser();

  // Ruta protegida y el usuario NO está autenticado
  if (requiresAuth && !user) {
    return <Navigate to="/auth" replace />;
  }

  // Ruta pública y el usuario SI está autenticado
  if (!requiresAuth && user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
