import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signup } from "../services/user";

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const Login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      setMessage("");

      const res = await auth(email, password);

      if (!res.ok) {
        setError(res.message);
      } else {
        setMessage(res.message);
        localStorage.setItem("username", res.user.name); // ✅ solo si necesitas mostrar el nombre
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setError("Error interno al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  const Signup = async (name, email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      setMessage("");

      const res = await signup(name, email, password);

      if (!res.ok) {
        setError(res.message);
      } else {
        setMessage(res.message);
        setTimeout(() => {
          Login(email, password);
        }, 500);
      }
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
