import { Logo } from "./Logo.jsx";
import { Folders } from "./Folders.jsx";
import { Account } from "./Account.jsx";
import { Theme } from "./Theme.jsx";
import { TrashButton } from "./TrashButton.jsx";
import { useLargeScreen } from "../../hooks/useLargeScreen.js";

export const Sidebar = () => {
  const { isLargeScreen } = useLargeScreen();

  return (
    <nav className="animate-slide-in-left bg-base-200/50 flex flex-col justify-between sm:p-5 p-4 pb-2 sm:rounded-xl rounded-t-xl h-1/2 sm:max-w-80 sm:min-w-72 sm:h-[calc(100dvh-20px)]">
      <div>
        <Logo />
        <Folders />
      </div>

      <div className="flex flex-col sm:gap-4 gap-2">
        <div className="animate-fade-in-up">
          <TrashButton />
        </div>
        {isLargeScreen && (
          <div className="animate-fade-in-up justify-center items-center flex">
            <Theme />
          </div>
        )}
        <Account />
      </div>
    </nav>
  );
};
