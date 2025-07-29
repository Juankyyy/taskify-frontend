// RouteGuard.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const PREFIX_API = "http://localhost:5000/api";

export const RouteGuard = ({ children, requiresAuth }) => {
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(null); // null: aún cargando

  useEffect(() => {
    // ✅ Si estamos en /auth, no verificamos nada

    const checkAuth = async () => {
      try {
        const res = await fetch(`${PREFIX_API}/users/me`, {
          method: "GET",
          credentials: "include", // ✅ Necesario para enviar cookies HttpOnly
        });

        if (!res.ok) throw new Error("No autenticado");

        const user = await res.json();
        setIsAuthenticated(!!user?._id);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    if (location.pathname === "/auth") {
      setIsAuthenticated(false); // No autenticado todavía      
    } else {
      checkAuth();
    }
  }, [location.pathname]);

  // ⏳ Mientras se verifica la sesión
  if (isAuthenticated === null) {
    return <div>Cargando sesión...</div>;
  }

  // 🔒 Ruta protegida y el usuario NO está autenticado
  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // 🔓 Ruta pública y el usuario SÍ está autenticado → redirigir al home
  if (!requiresAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // ✅ Acceso autorizado
  return children;
};
