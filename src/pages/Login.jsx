import { Link } from "react-router-dom";
import { AuthLayout } from "../Layouts/AuthLayout";
import { LoginForm } from "../components/Login/LoginForm";
import { Logo } from "../components/Sidebar/Logo";

export const Login = () => {
  // 🧠 Logic

  return (
    <AuthLayout>
      <Link to={"/"}>
        <Logo />
      </Link>
      <LoginForm />
    </AuthLayout>
  );
};
