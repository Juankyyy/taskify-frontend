import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signup } from "../services/user";
import { useUser } from "../contexts/User/UserProvider";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  // 🔐 Login
  const Login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      setMessage("");

      const res = await auth(email, password);

      if (!res.ok) {
        setError(res.message);
        return;
      }

      setMessage(res.message);

      // 🧠 Obtener datos del usuario autenticado (desde cookie)
      const meRes = await fetch("https://taskify-backend-98jt.onrender.com/api/users/me", {
        credentials: "include",
        cache: "no-store",
      });

      if (meRes.ok) {
        const meData = await meRes.json();
        setUser(meData);
        localStorage.setItem("username", meData.name);
        localStorage.setItem("avatar", res.avatar);
      }

      // ⏳ Esperar un poco antes de redirigir
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      console.error(err);
      setError("Error interno al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  // 🧾 Registro de usuario
  const Signup = async (name, email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      setMessage("");

      const res = await signup(name, email, password);

      if (!res.ok) {
        setError(res.message);
        return;
      }

      setMessage(res.message);

      setTimeout(() => {
        Login(email, password);
      }, 500);
    } catch (err) {
      console.error(err);
      setError("Error interno al registrar usuario");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    Login,
    Signup,
    isLoading,
    error,
    message,
  };
};
