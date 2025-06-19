import { EmailInput } from "./EmailInput";
import { PasswordInput } from "./PasswordInput";
import { useForm } from "../../hooks/useForm";

export const LoginForm = () => {
  const initialForm = {
    email: "",
    password: "",
  };

  const { email, password, onSubmit, onInputChange } = useForm(initialForm);

  return (
    <form onSubmit={onSubmit}>
      <EmailInput value={email} onInputChange={onInputChange} />
      <PasswordInput value={password} onInputChange={onInputChange} />

      <button type="submit" className="btn btn-wide btn-success rounded-full">
        Login
      </button>
    </form>
  );
};
