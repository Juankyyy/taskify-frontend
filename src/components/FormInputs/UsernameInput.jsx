import { User } from "lucide-react";

export const UsernameInput = ({ value, onInputChange }) => {

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
          className="input input-md border-0 input-primary pl-8"
        />
      </label>
    </>
  );
};
