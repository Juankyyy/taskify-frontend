import { EmailInput } from "./FormInputs/EmailInput";
import { PasswordInput } from "./FormInputs/PasswordInput";
import { useForm } from "../hooks/useForm";
import { ButtonForm } from "./FormInputs/ButtonForm";

export const LoginForm = () => {
  const initialForm = {
    email: "",
    password: "",
  };

  const { email, password, onSubmit, onInputChange, isLoading, error } =
    useForm(initialForm);

  return (
    <form onSubmit={onSubmit}>
      <EmailInput value={email} onInputChange={onInputChange} />
      <PasswordInput value={password} onInputChange={onInputChange} />

      <ButtonForm>
        {isLoading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          "Login"
        )}
      </ButtonForm>
      {error && <p>{error}</p>}
    </form>
  );
};
