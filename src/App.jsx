import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";

export const App = () => {
  // 🧠 Logic

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
};
