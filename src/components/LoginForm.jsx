import { EmailInput } from "./FormInputs/EmailInput";
import { PasswordInput } from "./FormInputs/PasswordInput";
import { useForm } from "../hooks/useForm";
import { ButtonForm } from "./FormInputs/ButtonForm";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useState } from "react";

export const LoginForm = () => {
  const initialForm = {
    email: "",
    password: "",
  };

  const { email, password, onSubmit, onInputChange, isLoading, error } =
    useForm(initialForm);

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  useEffect(() => {
    // Limpia los errores anteriores
    setEmailError(null);
    setPasswordError(null);

    // Asigna el error al campo correspondiente
    if (error === "Usuario no encontrado") {
      setEmailError(error);
    } else if (error === "Contraseña incorrecta") {
      setPasswordError(error);
    }
  }, [error]);

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 justify-center items-center"
    >
      <EmailInput
        value={email}
        onInputChange={onInputChange}
        error={emailError}
      />
      <PasswordInput
        value={password}
        onInputChange={onInputChange}
        error={passwordError}
      />

      <ButtonForm>
        {isLoading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          "Login"
        )}
      </ButtonForm>
      <Toaster />
    </form>
  );
};
