import { Link } from "react-router-dom";
import { AuthLayout } from "../Layouts/AuthLayout";
import { LoginForm } from "../components/Login/LoginForm";
import { Logo } from "../components/Sidebar/Logo";
import { useState } from "react";

export const Login = () => {
  const [formState, setFormState] = useState("Login");

  return (
    <AuthLayout>
      <Link to={"/"}>
        <Logo />
      </Link>
      <LoginForm />
    </AuthLayout>
  );
};
