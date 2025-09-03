import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import {
  changeAvatar,
  deleteAvatarByCookie,
  fetchCurrentUser,
  logout,
  changeUsernameByCookie,
  changeEmailByCookie,
  changePasswordbyCookie,
} from "../../services/user";
import toast from "react-hot-toast";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("username"));
  const [isLoading, setIsLoading] = useState(true);

  const [isLoadingUsername, setIsLoadingUsername] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);

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
      throw new Error(err);
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
      }

      setUser(res);
      return res;
    } catch (error) {
      if (error.message !== "Unauthorized") {
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("avatar");

        notifyError("Error al verificar sesión");
        console.error("Error al verificar sesión:", error);
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const changeUsername = async (username) => {
    try {
      setIsLoadingUsername(true);
      const response = await changeUsernameByCookie(username);

      if (!response.error) {
        notifySuccess(response.message);
        localStorage.setItem("username", response.name);
      } else {
        notifyError(response.message);
      }
    } catch (err) {
      throw new Error(err);
    } finally {
      setIsLoadingUsername(false);
    }
  };

  const changeEmail = async (email) => {
    try {
      setIsLoadingEmail(true);
      const response = await changeEmailByCookie(email);

      if (!response.error) {
        notifySuccess(response.message);
        localStorage.setItem("email", response.email);
      } else {
        notifyError(response.message);
      }
    } catch (err) {
      throw new Error(err);
    } finally {
      setIsLoadingEmail(false);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      setIsLoadingPassword(true);
      const response = await changePasswordbyCookie(
        currentPassword,
        newPassword
      );

      if (!response.error) {
        notifySuccess(response.message);
      } else {
        notifyError(response.message);
      }
    } catch (err) {
      throw new Error(err);
    } finally {
      setIsLoadingPassword(false);
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
    changeUsername,
    changeEmail,
    changePassword,
    isLoading,
    isLoadingUsername,
    isLoadingEmail,
    isLoadingPassword,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
