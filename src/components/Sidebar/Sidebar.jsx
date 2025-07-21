import { Logo } from "./Logo.jsx";
import { Folders } from "./Folders.jsx";
import { Account } from "./Account.jsx";
import { Theme } from "./Theme.jsx";
import { TrashButton } from "./TrashButton.jsx";

export const Sidebar = () => {
  // 🧠 Logic

  return (
    <nav className="bg-base-200/50 flex flex-col justify-between p-4 rounded-xl h-full sm:max-w-80 sm:min-w-72 sm:h-[calc(100dvh-20px)]">
      <div>
        <Logo />
        <Folders />
      </div>

      <div className="flex flex-col sm:gap-4 gap-2">
        <TrashButton />
        <div className="justify-center items-center sm:flex hidden">
          <Theme />
        </div>
        <Account />
      </div>
    </nav>
  );
};
