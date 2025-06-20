import { Link } from "react-router-dom";
import { AuthLayout } from "../Layouts/AuthLayout";
import { LoginForm } from "../components/Auth/LoginForm";
import { Logo } from "../components/Sidebar/Logo";
import { useState } from "react";
import { SignupForm } from "../components/Auth/SignupForm";

export const Auth = () => {
  const [formState, setFormState] = useState("Login");

  const changeForm = () => {
    setFormState(formState === "Login" ? "Signup" : "Login");
  };

  return (
    <AuthLayout>
      <Link to={"/"}>
        <Logo />
      </Link>

      {formState === "Login" ? <LoginForm /> : <SignupForm />}
      <p className="link" onClick={changeForm}>{formState === "Login" ? "Signup" : "Login"}</p>
    </AuthLayout>
  );
};
