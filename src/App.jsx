import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./Layouts/MainLayout";
import { AuthLayout } from "./Layouts/AuthLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

export const App = () => {
  // 🧠 Logic

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
      </Routes>
    </>
  );
};
