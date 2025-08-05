import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import {
  changeAvatar,
  deleteAvatar,
  fetchCurrentUser,
  logout,
} from "../../services/user";
import toast from "react-hot-toast";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("username"));
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const handleChangeAvatar = async (avatar) => {
    try {
      setIsLoading(true);
      const response = await changeAvatar(avatar);

      if (!response.error) {
        notifySuccess(response.message);
        localStorage.setItem("avatar", response.imageUrl);
      } else {
        notifyError(response.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      setIsLoading(true);
      const response = await deleteAvatar();

      if (!response.error) {
        notifySuccess(response.message);
        localStorage.setItem("avatar", "undefined");
      } else {
        notifyError(response.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      setIsLoading(true);

      const res = await fetchCurrentUser();

      if (res.error) {
        throw new Error("Unauthorized");
      } else {
        setUser(res);
        return res;
      }
    } catch (error) {
      if (error.message !== "Unauthorized") {
        console.error("Error al verificar sesión:", error);
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // ⛔ Evitamos llamar a /users/me si estamos en /auth
    if (location.pathname === "/auth") {
      setIsLoading(false);
      return;
    }

    fetchUser();
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  const value = {
    user,
    setUser,
    fetchUser,
    handleLogout,
    handleChangeAvatar,
    handleDeleteAvatar,
    isLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
