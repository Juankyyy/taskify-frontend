import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import toast from "react-hot-toast";

export const useForm = (initialForm, formType) => {
  const [formState, setFormState] = useState(initialForm);

  const { Login, Signup, isLoading, error } = useAuth();

  const notify = (message) => toast.error(message);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (formType === "login") {
      Login(formState.email, formState.password);
    } else if (formType === "signup") {
      console.log(formState)
      Signup(formState.name, formState.email, formState.password);
    }
  };

  useEffect(() => {
    if (formType === "login") {
      if (error) {
        notify(error);

        if (error.includes("Correo")) {
          setFormState(initialForm);
        } else {
          setFormState({ ...formState, password: "" });
        }
      }
    } else if (formType === "signup") {
      if (error) {
        notify(error);
      }
    }
  }, [error]);

  return {
    ...formState,
    formState,
    onSubmit,
    onInputChange,
    isLoading,
    error,
  };
};
