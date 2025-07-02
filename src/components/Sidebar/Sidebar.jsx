import { Logo } from "./Logo.jsx";
import { Folders } from "./Folders.jsx";
import { Account } from "./Account.jsx";
import { Theme } from "./Theme.jsx";

export const Sidebar = () => {
  // 🧠 Logic

  return (
    <nav className="bg-base-200 flex flex-col justify-between p-4 rounded-xl sm:max-w-80 sm:min-w-72 sm:h-[calc(100dvh-20px)]">
      <div>
        <Logo />
        <Folders />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-center items-center">
          <Theme />
        </div>
        <Account />
      </div>
    </nav>
  );
};
