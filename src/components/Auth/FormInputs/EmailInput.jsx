import { Mail } from "lucide-react";

export const EmailInput = ({ value, onInputChange, error }) => {
  return (
    <>
      <label className="floating-label validator w-2xs flex items-center">
        <span>Email</span>
        <input
          type="email"
          name="email"
          value={value}
          onChange={onInputChange}
          required
          placeholder="mail@example.com"
          className={`input [html[data-theme=dark]_&]:bg-black input-md border-0 pl-9 ${error ? "outline-2 outline-input-error outline-offset-2 z-[1] focus:outline-red-500" : "input-primary"}`}
        />
        <Mail className="absolute left-3 w-input-icon h-input-icon z-10 stroke-slate-600 [html[data-theme=dark]_&]:stroke-white" />
      </label>
    </>
  );
};
