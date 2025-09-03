import { UsernameInput } from "./FormInputs/UsernameInput";
import { EmailInput } from "./FormInputs/EmailInput";
import { PasswordInput } from "./FormInputs/PasswordInput";
import { ButtonForm } from "./FormInputs/ButtonForm";
import { useFormAuth } from "../../hooks/useFormAuth";

export const SignupForm = () => {
  const initialForm = {
    name: "",
    email: "",
    password: "",
  };

  const { name, email, password, onSubmit, onInputChange, isLoading, error } =
    useFormAuth(initialForm, "signup");

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 justify-center items-center"
    >
      <h1 className="animate-fade-in font-medium text-2xl mb-2">Create new account</h1>
      <UsernameInput value={name} onInputChange={onInputChange} error={error} />
      <EmailInput value={email} onInputChange={onInputChange} error={error} />
      <PasswordInput
        value={password}
        onInputChange={onInputChange}
        error={error}
      />

      <ButtonForm>
        {isLoading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          "Signup"
        )}
      </ButtonForm>
    </form>
  );
};
