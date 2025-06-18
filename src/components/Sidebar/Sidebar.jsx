import { Logo } from "./Logo.jsx";
import { Folders } from "./Folders.jsx";
import { Account } from "./Account.jsx";
import { Theme } from "./Theme.jsx";

export const Sidebar = () => {
  // 🧠 Logic

  return (
    <nav className="bg-white flex flex-col justify-between p-3 rounded-xl w-2xs h-[calc(100dvh-20px)]">
      <div>
        <Logo />
        <Folders />
      </div>

      <div className="flex flex-col gap-2">
        <Theme />
        <Account />
      </div>
    </nav>
  );
};
