import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useLargeScreen } from "../../hooks/useLargeScreen";

export const Theme = () => {
  const { theme, toggleTheme } = useTheme();
  const { isLargeScreen } = useLargeScreen();

  return (
    <>
      {isLargeScreen ? (
        <label className="flex justify-center items-center cursor-pointer gap-2 w-min">
          <Sun className="stroke-slate-400 sm:h-6 sm:w-6 h-5 w-5" />
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
            className="toggle theme-controller toggle-sm"
          />
          <Moon className="stroke-slate-400 sm:h-6 sm:w-6 h-5 w-5" />
        </label>
      ) : (
        <label className="toggle text-base-content">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
            className="theme-controller"
          />

          <svg
            aria-label="sun"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </g>
          </svg>

          <svg
            aria-label="moon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </g>
          </svg>
        </label>
      )}
    </>
  );
};
