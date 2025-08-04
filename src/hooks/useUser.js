import { useState } from "react";
import { changeAvatar } from "../services/user";
import toast from "react-hot-toast";

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

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
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleChangeAvatar,
    isLoading,
  };
};
