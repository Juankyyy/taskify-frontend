import { Moon } from "lucide-react";
import { Sun } from "lucide-react";

export const Theme = () => {
  // 🧠 Logic

  return (
    <label className="flex justify-center item cursor-pointer gap-2">
      <Sun />
      <input
        type="checkbox"
        value="dark"
        className="toggle theme-controller bg-slate-300"
      />
      <Moon />
    </label>
  );
};
