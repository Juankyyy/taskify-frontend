// src/contexts/User/UserProvider.jsx
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

const PREFIX_API = "http://localhost:5000/api";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${PREFIX_API}/users/me`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();

        // ✅ Nos aseguramos de que esté extrayendo el usuario
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await fetch(`${PREFIX_API}/users/logout`, {
        method: "POST",
        credentials: "include",
      });

      setUser(null); // Limpiar el contexto
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
