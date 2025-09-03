import { KeyRound } from "lucide-react";

export const PasswordInput = ({ value, onInputChange, error }) => {
  return (
    <>
      <label className="animate-pulse-fade-in floating-label validator w-2xs flex items-center">
        <span>Password</span>
        <input
          type="password"
          name="password"
          value={value}
          onChange={onInputChange}
          required
          placeholder="Password"
          minLength="6"
          pattern="(?=.*\d)(?=.*[a-z]).{6,}"
          title="Minimo 6 caracteres, incluyendo un número y una letra minúscula"
          className={`input [html[data-theme=dark]_&]:bg-black input-md border-0 pl-9 ${error ? "outline-2 outline-input-error outline-offset-2 z-[1] focus:outline-red-500" : "input-primary"}`}
        />
        <KeyRound className="absolute left-3 w-input-icon h-input-icon z-10 stroke-slate-600 [html[data-theme=dark]_&]:stroke-slate-300" />
      </label>
    </>
  );
};
