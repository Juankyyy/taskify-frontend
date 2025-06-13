import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "./Layouts/AuthLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

export const App = () => {
  // 🧠 Logic

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
