import {
  ArrowLeft,
  Pencil,
  Trash2,
  Languages,
  UserRoundPen,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Theme } from "../components/Sidebar/Theme";
import en from "/src/assets/en-flag.svg";
import es from "/src/assets/es-flag.svg";
import { DefaultAvatar } from "../components/DefaultAvatar";

export const Settings = () => {
  const avatar = localStorage.getItem("avatar");
  const username = localStorage.getItem("username");

  return (
    <main className="m-5 h-[calc(100dvh-40px)] bg-base-300 rounded-2xl">
      <nav className=" p-3 bg-base-100 rounded-2xl flex justify-between items-center">
        <Link to={"/"} className="btn">
          <ArrowLeft />
          Volver
        </Link>
        <h1 className="text-xl font-bold">Settings</h1>
        <Theme />
      </nav>

      <section className="m-3">
        <article className="flex flex-col gap-3 p-3">
          <div className="flex gap-2 items-center">
            <UserRoundPen className="w-icon h-icon" />
            <h2 className="text-lg font-bold">Perfil</h2>
          </div>

          <div className="flex gap-16 items-center">
            <div className="avatar relative group cursor-pointer">
              <div className="sm:w-10 w-32! rounded-full relative overflow-hidden">
                {avatar != "undefined" ? (
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <DefaultAvatar textSize="text-6xl" />
                )}

                {avatar != "undefined" && (
                  <div className="absolute top-0 left-0 w-1/2 h-full rounded-l-full bg-red-700 hover:bg-red-600 opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center">
                    <Trash2 className="w-6 h-6 stroke-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}

                <div className="absolute top-0 right-0 w-1/2 h-full peer rounded-r-full bg-black hover:bg-sky-950 opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center">
                  <Pencil className="w-6 h-6 stroke-white opacity-0 peer-hover:opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Username"
                  className="input input-ghost rounded-none text-lg p-0 border-b focus:border-b-black [html[data-theme=dark]_&]:focus:border-b-white focus:outline-0"
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
                  className="input input-ghost rounded-none text-md p-0 border-b focus:border-b-black [html[data-theme=dark]_&]:focus:border-b-white focus:outline-0"
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
          </div>

          <div className="flex gap-3 items-center">
            <img src={es} alt="es-flag" />
            <p>Español</p>
          </div>

          <div className="flex gap-3 items-center">
            <img src={en} alt="en-flag" />
            <p>English</p>
          </div>
        </article>
      </section>
    </main>
  );
};
