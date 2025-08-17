import {
  ArrowLeft,
  Languages,
  UserRoundPen,
  LockKeyhole,
  PenLine,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Theme } from "../components/Sidebar/Theme";
import { Toaster } from "react-hot-toast";
import { Avatar } from "../components/Settings/Avatar";
import { UserInfo } from "../components/Settings/UserInfo";

export const Settings = () => {
  // const handleChangePassword = () => {
  //   if (password === confirmPassword) {
  //     changePassword(password);
  //   } else {
  //     notifyError("Las contraseñas no coinciden");
  //   }
  // };

  return (
    <main className="m-5 h-[calc(100dvh-40px)] bg-base-100 rounded-2xl">
      <nav className="p-3 px-6 rounded-2xl flex justify-between items-center">
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

          <div className="flex flex-col gap-8 items-center justify-center">
            <Avatar />

            <UserInfo />
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
