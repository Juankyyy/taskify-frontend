import { User } from "lucide-react";

export const UsernameInput = () => {
  return (
    <>
      <label className="floating-label validator w-2xs flex items-center">
        <span>Username</span>
        <input
          type="text"
          required
          placeholder="Username"
          pattern="[A-Za-z][A-Za-z0-9\-]*"
          minLength="3"
          maxLength="30"
          title="Solo letras, números o guiones"
          className="input input-md border-0 input-primary pl-8"
        />
        <User className="absolute left-2 w-icon h-icon z-10" />
      </label>
      <p className="validator-hint">
        Tienes que ser de 3 a 30 caracteres
        <br />
        Que contengan solo letras, números o guiones
      </p>
    </>
  );
};
