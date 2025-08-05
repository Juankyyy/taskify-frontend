import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signup } from "../services/user";
import { useUser } from "../hooks/useUser";

export const useAuth = () => {
  const navigate = useNavigate();
  const { fetchUser } = useUser();

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
        return;
      }

      setMessage(res.message);

      const meRes = await fetchUser();
      localStorage.setItem("username", meRes.name);
      localStorage.setItem("avatar", meRes.avatar);

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
