import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export const Theme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
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
  );
};
