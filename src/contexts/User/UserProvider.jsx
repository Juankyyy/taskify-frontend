import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";

const PREFIX_API = "https://taskify-backend-98jt.onrender.com/api";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // ✅ Para saber en qué ruta estamos

  useEffect(() => {
    // ⛔ Evitamos llamar a /users/me si estamos en /auth
    if (location.pathname === "/auth") {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${PREFIX_API}/users/me`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();

        setUser(data);
      } catch (error) {
        if (error.message !== "Unauthorized") {
          console.error("Error al verificar sesión:", error);
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [location.pathname]);

  const logout = async () => {
    await user.logout(); // Este método debería estar en el servicio, revisa esto
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
