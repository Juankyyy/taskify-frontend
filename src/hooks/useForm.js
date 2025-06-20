import { useState } from "react";
import { useAuth } from "./useAuth";

export const useForm = (initialForm) => {
  const [formState, setFormState] = useState(initialForm);

  const { Login, isLoading, error } = useAuth();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    Login(formState.email, formState.password);
  };

  return {
    ...formState,
    formState,
    onSubmit,
    onInputChange,
    isLoading,
    error,
  };
};
