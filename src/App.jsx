import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { Settings } from "./pages/Settings";
import { RouteGuard } from "./components/RouteGuard";
import { Tasks } from "./components/Home/Tasks/Tasks";
import { Trash } from "./components/Home/Trash";

export const App = () => {
  return (
    <Routes>
      {/* 🔓 Ruta pública (Login / Registro) */}
      <Route
        path="/auth"
        element={
          <RouteGuard requiresAuth={false}>
            <Auth />
          </RouteGuard>
        }
      />

      {/* 🔐 Ruta protegida: Home */}
      <Route
        path="/"
        element={
          <RouteGuard requiresAuth={true}>
            <Home />
          </RouteGuard>
        }
      >
        {/* 🗂️ Subrutas protegidas (se renderizan dentro de <Outlet /> en Home) */}
        <Route path="tasks" element={<Tasks />} />
        <Route path="trash" element={<Trash />} />
      </Route>
    </Routes>
  );
};
