import { Logo } from "./Logo.jsx";
import { Lists } from "./Lists.jsx";

export const Sidebar = () => {
  // 🧠 Logic

  return (
    <nav className="bg-white flex flex-col p-3 rounded-xl w-2xs h-[calc(100dvh-20px)]">
      <Logo />
      <Lists />
    </nav>
  );
};