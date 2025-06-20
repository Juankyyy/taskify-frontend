import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import toast from "react-hot-toast";

export const useForm = (initialForm) => {
  const [formState, setFormState] = useState(initialForm);

  const { Login, isLoading, error } = useAuth();

  const notify = (message) => toast.error(message);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    Login(formState.email, formState.password);
  };

  useEffect(() => {
    if (error == "Contraseña incorrecta") {
      notify("Contraseña incorrecta");
      setFormState({ ...formState, password: "" });
    } else if (error == "Usuario no encontrado") {
      notify("Usuario no encontrado");
      setFormState({ ...formState, password: "" });
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
