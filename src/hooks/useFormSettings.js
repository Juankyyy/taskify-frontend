import { useState } from "react";
// import toast from "react-hot-toast";
import { useUser } from "./useUser";

export const useFormSettings = ({ username = null, email = null, type }) => {
  const [formState, setFormState] = useState(() => {
    // Inicializar el estado solo una vez
    if (type === "username") {
      return { username: username };
    } else if (type === "email") {
      return { email: email };
    } else if (type === "password") {
      return { currentPassword: "", newPassword: "" };
    }
    return {};
  });

  const {
    changeUsername,
    changeEmail,
    changePassword,
    isLoadingForm,
  } = useUser();

  // const notifyError = (message) => toast.error(message);
  // const notifySuccess = (message) => toast.success(message);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (type === "username") {
      changeUsername(formState.username);
    } else if (type === "email") {
      changeEmail(formState.email);
    } else if (type === "password") {
      try {
        changePassword(formState.currentPassword, formState.newPassword);
        formState.currentPassword = "";
        formState.newPassword = "";
      } catch (err) {
        console.error(err);
      }
    }
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onSubmit,
    isLoadingForm,
  };
};
