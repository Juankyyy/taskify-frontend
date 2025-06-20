import { Link } from "react-router-dom";
import { AuthLayout } from "../Layouts/AuthLayout";
import { LoginForm } from "../components/LoginForm";
import { Logo } from "../components/Sidebar/Logo";
import { useState } from "react";
import { SignupForm } from "../components/SignupForm";

export const Login = () => {
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
      <button className="link" onClick={changeForm}>{formState === "Login" ? "Signup" : "Login"}</button>
    </AuthLayout>
  );
};
