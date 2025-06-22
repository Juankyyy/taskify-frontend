import { User } from "lucide-react";

export const UsernameInput = ({ value, onInputChange, error }) => {

  return (
    <>
      <label className="floating-label validator w-2xs flex items-center">

        <span>Username</span>
        <input
          type="text"
          name="name"
          value={value}
          onChange={onInputChange}
          required
          placeholder="Username"
          pattern="[A-Za-z][A-Za-z0-9\-]*"
          minLength="3"
          maxLength="15"
          title="Solo letras, números o guiones"
          className={`input [html[data-theme=dark]_&]:bg-black input-md border-0 pl-9 ${error ? "outline-2 outline-input-error outline-offset-2 z-[1] focus:outline-red-500" : "input-primary"}`}
        />
        <User className="absolute left-3 w-input-icon h-input-icon z-10 stroke-slate-600 [html[data-theme=dark]_&]:stroke-white" />
      </label>
    </>
  );
};

// INPUTS COLOR IN DARK MODE
