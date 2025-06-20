import { KeyRound } from "lucide-react";

export const PasswordInput = ({ value, onInputChange }) => {
  return (
    <>
      <label className="floating-label validator w-2xs flex items-center mb-4">
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
          className="input input-md border-0 input-primary pl-9"
        />
        <KeyRound className="absolute left-2 w-icon h-icon z-10 stroke-slate-600" />
      </label>
      <p className="validator-hint hidden">
        Minimo 6 caracteres
        <br />
        incluyendo un número y una letra minúscula
      </p>
    </>
  );
};
