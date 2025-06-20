import { Mail } from "lucide-react";

export const EmailInput = ({ value, onInputChange }) => {
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
          className="input input-md border-0 input-primary pl-9"
        />
        <Mail className="absolute left-2 w-input-icon h-input-icon z-10 stroke-slate-600" />
      </label>
    </>
  );
};
