import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
import { useUser } from "./useUser";

export const useFormSettings = ({ username = null, email = null, type }) => {
  const [formState, setFormState] = useState(() => {
    // Inicializar el estado solo una vez
    if (type === "username") {
      return { username: username };
    } else if (type === "email") {
      return { email: email };
    }
    return {};
  });

  const { changeUsername, changeEmail, isLoadingForm } = useUser();

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
    }
    else if (type === "email") {
      changeEmail(formState.email);
    }
  };

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  return {
    ...formState,
    formState,
    onInputChange,
    onSubmit,
    isLoadingForm,
  };
};
