import { Logo } from "./Logo.jsx";
import { Folders } from "./Folders.jsx";
import { Account } from "./Account.jsx";
import { Theme } from "./Theme.jsx";
import { TrashButton } from "./TrashButton.jsx";
import { useState, useEffect } from "react";

export const Sidebar = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <nav className="bg-base-200/50 flex flex-col justify-between p-4 rounded-xl h-1/2 sm:max-w-80 sm:min-w-72 sm:h-[calc(100dvh-20px)]">
      <div>
        <Logo />
        <Folders />
      </div>

      <div className="flex flex-col sm:gap-4 gap-2">
        <TrashButton />
        {isLargeScreen && (
          <div className="justify-center items-center flex">
            <Theme />
          </div>
        )}
        <Account />
      </div>
    </nav>
  );
};
