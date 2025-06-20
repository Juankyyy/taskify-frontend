import { User } from "lucide-react";

export const UsernameInput = ({ value, onInputChange, error }) => {

  return (
    <>
      <label className="floating-label validator w-2xs flex items-center">

        <span>Username</span>
        <input
          type="text"
          name="username"
          value={value}
          onChange={onInputChange}
          required
          placeholder="Username"
          pattern="[A-Za-z][A-Za-z0-9\-]*"
          minLength="3"
          maxLength="15"
          title="Solo letras, números o guiones"
          className={`input input-md border-0 pl-9 ${error ? "outline-2 outline-input-error outline-offset-2 z-[1] focus:outline-red-500" : "input-primary"}`}
        />
        <User className="absolute left-2 w-input-icon h-input-icon z-10 stroke-slate-600" />
      </label>
    </>
  );
};
