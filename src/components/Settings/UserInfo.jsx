import { AtSign } from "lucide-react";
import { useFormSettings } from "../../hooks/useFormSettings";
import { CircleUserRound } from "lucide-react";

export const UserInfo = () => {
  const usernameLocal = localStorage.getItem("username");
  const emailLocal = localStorage.getItem("email");

  const {
    username,
    onInputChange: onInputChangeUsername,
    onSubmit: onSubmitUsername,
    isLoadingUsername,
  } = useFormSettings({
    username: usernameLocal,
    type: "username",
  });

  const {
    email,
    onInputChange: onInputChangeEmail,
    onSubmit: onSubmitEmail,
    isLoadingEmail,
  } = useFormSettings({
    email: emailLocal,
    type: "email",
  });

  return (
    <div className="animate-fade-in flex gap-3 mt-4">
      <form onSubmit={onSubmitUsername} className="flex gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-center">
            <CircleUserRound />
          </div>
          <input
            type="text"
            placeholder="Nombre"
            className="input input-ghost text-center rounded-lg text-lg border focus:border-black [html[data-theme=dark]_&]:focus:border-white focus:outline-0"
            name="username"
            value={username}
            onChange={onInputChangeUsername}
            required
          />
          <div className="min-h-8">
            {username != usernameLocal && (
              <button
                type="submit"
                disabled={isLoadingUsername}
                className="btn btn-sm w-full"
              >
                {isLoadingUsername ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Guadar"
                )}
              </button>
            )}
          </div>
        </div>
      </form>

      <form onSubmit={onSubmitEmail} className="flex gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-center">
            <AtSign />
          </div>
          <input
            type="text"
            placeholder="Correo"
            className="input input-ghost text-center rounded-lg text-lg border focus:border-black [html[data-theme=dark]_&]:focus:border-white focus:outline-0"
            name="email"
            value={email}
            onChange={onInputChangeEmail}
            required
          />
          <div className="min-h-8">
            {email != emailLocal && (
              <button
                type="submit"
                disabled={isLoadingEmail}
                className="btn btn-sm w-full"
              >
                {isLoadingEmail ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Guadar"
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
