import {
  ArrowLeft,
  Languages,
  UserRoundPen,
  Check,
  LockKeyhole,
  PenLine,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Theme } from "../components/Sidebar/Theme";
import { Toaster } from "react-hot-toast";
import { Avatar } from "../components/Settings/Avatar";

export const Settings = () => {
  const username = localStorage.getItem("username");

  // const handleChangePassword = () => {
  //   if (password === confirmPassword) {
  //     changePassword(password);
  //   } else {
  //     notifyError("Las contraseñas no coinciden");
  //   }
  // };

  return (
    <main className="m-5 h-[calc(100dvh-40px)] bg-base-300 rounded-2xl">
      <nav className=" p-3 bg-base-100 rounded-2xl flex justify-between items-center">
        <Link to={"/"} className="btn">
          <ArrowLeft />
          Volver
        </Link>
        <h1 className="text-xl font-bold">Ajustes</h1>
        <Theme />
      </nav>

      <section className="m-3">
        <article className="flex flex-col gap-3 p-3">
          <div className="flex gap-2 items-center">
            <UserRoundPen className="w-icon h-icon" />
            <h2 className="text-lg font-bold">Perfil</h2>
          </div>

          <div className="flex gap-16 items-center">
            <Avatar />

            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
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
                  className="input input-ghost rounded-lg text-md border focus:border-black [html[data-theme=dark]_&]:focus:border-white focus:outline-0"
                  name="email"
                  value="Nombre@gmail.com"
                  required
                />
                <button className="btn btn-circle btn-sm">
                  <Check className="w-icon h-icon" />
                </button>
              </div>
            </div>
          </div>
        </article>

        <article className="flex flex-col gap-3 p-3">
          <div className="flex gap-2 items-center">
            <Languages className="w-icon h-icon" />
            <h2 className="text-lg font-bold">Idioma</h2>
            <div className="badge badge-primary">Proximamente!</div>
          </div>
        </article>

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

            <button className="btn btn-sm btn-success">
              <PenLine className="w-icon h-icon" />
              Cambiar
            </button>
          </div>
        </article>
      </section>
      <Toaster />
    </main>
  );
};
