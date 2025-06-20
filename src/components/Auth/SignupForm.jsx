import { UsernameInput } from "./FormInputs/UsernameInput";
import { EmailInput } from "./FormInputs/EmailInput";
import { PasswordInput } from "./FormInputs/PasswordInput";
import { ButtonForm } from "./FormInputs/ButtonForm";

export const SignupForm = () => {
  const initialForm = {
    username: "",
    email: "",
    password: "",
  };

  return (
    <form className="flex flex-col gap-4 justify-center items-center">
      <h1 className="font-medium text-2xl">Create new account</h1>
      <UsernameInput />
      <EmailInput />
      <PasswordInput />

      <ButtonForm>
        Registrarse
      </ButtonForm>
    </form>
  );
};
