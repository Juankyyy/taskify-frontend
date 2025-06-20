import { auth } from "../services/user";

export const useAuth = () => {
  

  const Login = async (email, password) => {
    const jwt = await auth(email, password);
    localStorage.setItem("token", jwt.token);
  };

  return {
    Login,
  };
};
