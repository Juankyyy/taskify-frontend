import { changeAvatar } from "../services/user";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../contexts/User/UserContext";

export const useUser = () => {
  const context = useContext(UserContext);

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const handleChangeAvatar = async (avatar) => {
    try {
      setIsLoading(true);
      const response = await changeAvatar(avatar, token);

      if (!response.error) {
        notifySuccess(response.message);
        localStorage.setItem("avatar", response.imageUrl);
      } else {
        notifyError(response.message);
      }
    } finally {
  return context;
};
