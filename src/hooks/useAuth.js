import { useState } from "react";
import { auth, signup } from "../services/user";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const Login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await auth(email, password);
      if (!res.ok) {
        setError(res.message);
      } else {
        localStorage.setItem("token", res.token);
        navigate("/");
      }
    } catch (err) {
      throw new Error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const Signup = async (name, email, password) => {
    try {
      setIsLoading(true)
      setError(null)

      const res = await signup(name, email, password)
      if (!res.ok) {
        setError(res.message)
      } else {
        console.log(res)
      }
    } catch (err) {
      throw new Error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    Login,
    Signup,
    isLoading,
    error,
  };
};
