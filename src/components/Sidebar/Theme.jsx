import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export const Theme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="flex justify-center item cursor-pointer gap-2">
      <Sun />
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
        className="toggle theme-controller bg-slate-300"
      />
      <Moon />
    </label>
  );
};
