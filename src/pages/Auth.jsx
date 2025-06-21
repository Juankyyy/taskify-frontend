import { Link } from "react-router-dom";
import { AuthLayout } from "../Layouts/AuthLayout";
import { LoginForm } from "../components/Auth/LoginForm";
import { Logo } from "../components/Sidebar/Logo";
import { useState } from "react";
import { SignupForm } from "../components/Auth/SignupForm";
import { Toaster } from "react-hot-toast";

export const Auth = () => {
  const [formType, setformType] = useState("Signup");

  const changeForm = () => {
    setformType(formType === "Login" ? "Signup" : "Login");
  };

  return (
    <AuthLayout>
      <Link to={"/"}>
        <Logo />
      </Link>

      {formType === "Login" ? <LoginForm /> : <SignupForm />}

      <p className="link" onClick={changeForm}>
        {formType === "Login" ? "Signup" : "Login"}
      </p>
      <Toaster />
    </AuthLayout>
  );
};
