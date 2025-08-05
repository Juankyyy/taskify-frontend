import { Check } from "lucide-react";

export const UserInfo = ({ username }) => {
  // 🧠 Logic

  return (
    <div className="flex gap-3">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Username"
          className="input input-ghost rounded-lg text-lg border focus:border-black [html[data-theme=dark]_&]:focus:border-white focus:outline-0"
          name="username"
          value={username}
          required
        />
        <button className="btn btn-circle btn-sm">
          <Check className="w-icon h-icon" />
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Correo"
          className="input input-ghost rounded-lg text-lg border focus:border-black [html[data-theme=dark]_&]:focus:border-white focus:outline-0"
          name="email"
          value="Nombre@gmail.com"
          required
        />
        <button className="btn btn-circle btn-sm">
          <Check className="w-icon h-icon" />
        </button>
      </div>
    </div>
  );
};
