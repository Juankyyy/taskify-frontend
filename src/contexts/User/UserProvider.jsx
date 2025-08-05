import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import {
  changeAvatar,
  deleteAvatarByCookie,
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

  const DeleteAvatar = async () => {
    try {
      setIsLoading(true);
      const response = await deleteAvatarByCookie();

      if (!response.error) {
        notifySuccess(response.message);
        localStorage.setItem("avatar", "undefined");
      } else {
        notifyError(response.message);
      }
    } catch (err) {
      throw new Error(err);
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
        notifyError("Error al verificar sesión");
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
    DeleteAvatar,
    isLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
