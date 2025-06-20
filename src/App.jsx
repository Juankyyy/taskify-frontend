import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { RouteGuard } from "./components/RouteGuard";

export const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RouteGuard requiresAuth={true}>
              <Home />
            </RouteGuard>
          }
        />

        <Route
          path="/auth"
          element={
            <RouteGuard requiresAuth={false}>
              <Auth />
            </RouteGuard>
          }
        />
      </Routes>
    </>
  );
};
