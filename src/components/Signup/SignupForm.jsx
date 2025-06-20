import { UsernameInput } from "../FormInputs/UsernameInput";
import { EmailInput } from "../FormInputs/EmailInput";
import { PasswordInput } from "../FormInputs/PasswordInput";
import { ButtonForm } from "../FormInputs/ButtonForm";

export const SignupForm = () => {
  // 🧠 Logic

  return (
    <>
      <h1>Signup</h1>
      <UsernameInput />
      <EmailInput />
      <PasswordInput />

      <ButtonForm>
        Registrarse
      </ButtonForm>
    </>
  );
};
