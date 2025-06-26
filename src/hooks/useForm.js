import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import toast from "react-hot-toast";

export const useForm = (initialForm, formType) => {
  const [formState, setFormState] = useState(initialForm);

  const { Login, Signup, isLoading, error, message } = useAuth();

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (formType === "login") {
      Login(formState.email, formState.password);
    } else if (formType === "signup") {
      Signup(formState.name, formState.email, formState.password);
    }
  };

  useEffect(() => {
    if (formType === "login") {
      if (error) {
        notifyError(error);

        if (error.includes("Correo")) {
          setFormState(initialForm);
        } else {
          setFormState({ ...formState, password: "" });
        }
      }
      if (message) {
        notifySuccess(message);
      }
    } else if (formType === "signup") {
      if (error) {
        notifyError(error);
      } else if (message) {
        notifySuccess(message);
      }
    }
  }, [error, formState, formType, initialForm, message]);

  return {
    ...formState,
    formState,
    onSubmit,
    onInputChange,
    isLoading,
    error,
  };
};
