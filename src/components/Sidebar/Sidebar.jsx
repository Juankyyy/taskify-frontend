import { Logo } from "./Logo.jsx";
import { Folders } from "./Folders.jsx";
import { Account } from "./Account.jsx";
import { Theme } from "./Theme.jsx";

export const Sidebar = () => {
  // 🧠 Logic

  return (
    <nav className="bg-base-200 flex flex-col justify-between p-3 rounded-xl w-2xs h-[calc(100dvh-20px)]">
      <div>
        <Logo />
        <Folders />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-center items-center">
          <Theme />
        </div>
        <Account />
      </div>
    </nav>
  );
};
