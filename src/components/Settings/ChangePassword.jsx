import { LockKeyhole, PenLine } from "lucide-react";

export const ChangePassword = () => {
  // const handleChangePassword = () => {
  //   if (password === confirmPassword) {
  //     changePassword(password);
  //   } else {
  //     notifyError("Las contraseñas no coinciden");
  //   }
  // };

  return (
    <article className="flex flex-col gap-3 p-3">
      <div className="flex gap-2 items-center">
        <LockKeyhole className="w-icon h-icon" />
        <h2 className="text-lg font-bold">Cambiar contraseña</h2>
      </div>

      <div className="flex gap-4 items-center">
        <label className="input transition-all focus-within:outline-0 focus-within:border-black [html[data-theme=dark]_&]:focus-within:border-white focus-within:rounded-md">
          <input
            required
            type="password"
            className="grow"
            placeholder="Contraseña actual"
          />
        </label>

        <label className="input transition-all focus-within:outline-0 focus-within:border-black [html[data-theme=dark]_&]:focus-within:border-white focus-within:rounded-md">
          <input
            required
            type="password"
            className="grow"
            placeholder="Contraseña nueva"
          />
        </label>

        <button className="btn btn-sm btn-accent">
          <PenLine className="w-icon h-icon" />
          Cambiar
        </button>
      </div>
    </article>
  );
};
