import { Check } from "lucide-react";
import { useFormSettings } from "../../hooks/useFormSettings";

export const UserInfo = () => {
  const usernameLocal = localStorage.getItem("username");
  const emailLocal = localStorage.getItem("email");

  const {
    username,
    onInputChange: onInputChangeUsername,
    onSubmit: onSubmitUsername,
    isLoadingForm: isLoadingUsername,
  } = useFormSettings({
    username: usernameLocal,
    type: "username",
  });

  const {
    email,
    onInputChange: onInputChangeEmail,
    onSubmit: onSubmitEmail,
    isLoadingForm: isLoadingEmail,
  } = useFormSettings({
    email: emailLocal,
    type: "email",
  });

  return (
    <div className="flex gap-3">
      <form onSubmit={onSubmitUsername} className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Nombre"
          className="input input-ghost rounded-lg text-lg border focus:border-black [html[data-theme=dark]_&]:focus:border-white focus:outline-0"
          name="username"
          value={username}
          onChange={onInputChangeUsername}
          required
        />
        {username != usernameLocal && (
          <button type="submit" disabled={isLoadingUsername} className="btn btn-circle btn-sm">
            {isLoadingUsername ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <Check className="w-icon h-icon" />
            )}
          </button>
        )}
      </form>

      <form onSubmit={onSubmitEmail} className="flex gap-2">
        <input
          type="text"
          placeholder="Correo"
          className="input input-ghost rounded-lg text-lg border focus:border-black [html[data-theme=dark]_&]:focus:border-white focus:outline-0"
          name="email"
          value={email}
          onChange={onInputChangeEmail}
          required
        />
        {email != emailLocal && (
          <button type="submit" disabled={isLoadingEmail} className="btn btn-circle btn-sm">
            {isLoadingEmail ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <Check className="w-icon h-icon" />
            )}
          </button>
        )}
      </form>
    </div>
  );
};
