import { LockKeyhole, PenLine } from "lucide-react";
import { useFormSettings } from "../../hooks/useFormSettings";

export const ChangePassword = () => {
  const { formState, onInputChange, onSubmit, isLoadingForm } = useFormSettings({
    type: "password",
  });

  return (
    <article className="flex flex-col gap-3 p-3">
      <div className="flex gap-2 items-center">
        <LockKeyhole className="w-icon h-icon" />
        <h2 className="text-lg font-bold">Cambiar contraseña</h2>
      </div>

      <form onSubmit={onSubmit} className="flex gap-4 items-center">
        <label className="input transition-all focus-within:outline-0 focus-within:border-black [html[data-theme=dark]_&]:focus-within:border-white focus-within:rounded-md">
          <input
            required
            name="currentPassword"
            value={formState.currentPassword}
            onChange={onInputChange}
            type="password"
            className="grow"
            placeholder="Contraseña actual"
          />
        </label>

        <label className="input transition-all focus-within:outline-0 focus-within:border-black [html[data-theme=dark]_&]:focus-within:border-white focus-within:rounded-md">
          <input
            required
            name="newPassword"
            value={formState.newPassword}
            onChange={onInputChange}
            type="password"
            className="grow"
            placeholder="Contraseña nueva"
            minLength="6"
            pattern="(?=.*\d)(?=.*[a-z]).{6,}"
            title="Minimo 6 caracteres, incluyendo un número y una letra minúscula"
          />
        </label>

        <button className="btn btn-sm btn-accent">
          {isLoadingForm ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <>
              <PenLine className="w-icon h-icon" />
              Cambiar
            </>
          )}
        </button>
      </form>
    </article>
  );
};
