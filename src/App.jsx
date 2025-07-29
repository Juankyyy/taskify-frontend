// App.jsx
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { RouteGuard } from "./components/RouteGuard";
import { Tasks } from "./components/Home/Tasks/Tasks";
import { Trash } from "./components/Home/Trash";

export const App = () => {
  return (
    <Routes>
      {/* 🔐 Ruta protegida */}
      <Route
        path="/"
        element={
          <RouteGuard requiresAuth={true}>
            <Home />
          </RouteGuard>
        }
      >
        {/* 📁 Subrutas protegidas */}
        <Route path="tasks" element={<Tasks />} />
        <Route path="trash" element={<Trash />} />
      </Route>

      {/* 🔓 Ruta pública (login/signup) */}
      <Route
        path="/auth"
        element={
          <RouteGuard requiresAuth={false}>
            <Auth />
          </RouteGuard>
        }
      />
    </Routes>
  );
};
