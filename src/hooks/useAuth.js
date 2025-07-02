import { useState } from "react";
import { auth, signup } from "../services/user";
import { useNavigate } from "react-router-dom";

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
        localStorage.setItem("token", res.token);
        localStorage.setItem("username", res.name);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      throw new Error(err);
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
        setMessage(res.data);
        setTimeout(() => {
          Login(email, password);
        }, 500);
      }
    } catch (err) {
      throw new Error(err);
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
