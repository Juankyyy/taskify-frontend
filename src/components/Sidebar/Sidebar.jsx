import { Logo } from "./Logo.jsx";

export const Sidebar = () => {
  // 🧠 Logic

  return (
    <nav className="bg-white flex flex-col p-3 rounded-xl max-w-2xs h-dvh">
      <Logo />
    </nav>
  );
};