// src/components/RouteGuard.jsx
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/User/UserProvider";

export const RouteGuard = ({ children, requiresAuth }) => {
  const { user, loading } = useUser();

  // ⏳ Mientras se valida la sesión (por ejemplo, fetch a /me)
  if (loading) {
    return (
      <div className="text-white p-4 text-center animate-pulse">
        Cargando sesión...
      </div>
    );
  }

  // 🔒 Ruta protegida y el usuario NO está autenticado
  if (requiresAuth && !user) {
    return <Navigate to="/auth" replace />;
  }

  // 🔓 Ruta pública y el usuario SÍ está autenticado
  if (!requiresAuth && user) {
    return <Navigate to="/" replace />;
  }

  // ✅ Acceso permitido
  return children;
};
