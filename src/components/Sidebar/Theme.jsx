import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export const Theme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="flex justify-center items-center cursor-pointer gap-2 w-min">
      <Sun className="stroke-slate-400" />
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
        className="toggle theme-controller"
      />
      <Moon className="stroke-slate-400" />
    </label>
  );
};
