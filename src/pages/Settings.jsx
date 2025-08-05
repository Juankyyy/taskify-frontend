import { useRef, useState } from "react";
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
import { DefaultAvatar } from "../components/DefaultAvatar";
import { useUser } from "../hooks/useUser";
import { Toaster } from "react-hot-toast";
import en from "/src/assets/en-flag.svg";
import es from "/src/assets/es-flag.svg";

export const Settings = () => {
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));
  const [avatarFile, setAvatarFile] = useState(null);
  const username = localStorage.getItem("username");
  const fileInputRef = useRef(null);

  const { handleChangeAvatar, isLoading } = useUser();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validar que sea una imagen
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target.result;

          setAvatar(imageUrl);
          setAvatarFile(file);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Por favor selecciona una imagen válida");
      }
    }
  };

  const uploadAvatar = () => {
    handleChangeAvatar(avatarFile);
  };

  // Función para abrir el selector de archivos
  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteAvatar = () => {
    localStorage.setItem("avatar", "undefined");
    window.location.reload();
  };

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
            <div className="avatar relative group cursor-pointer rounded-full">
              <div className="sm:w-10 w-40! rounded-full relative overflow-hidden">
                {avatar != "undefined" ? (
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <DefaultAvatar textSize="text-6xl" />
                )}

                {isLoading && (
                  <div
                    className={`absolute cursor-crosshair top-0 right-0 left-0 h-full peer rounded-r-full bg-black opacity-50 flex items-center justify-center`}
                  >
                    <span className="loading loading-spinner loading-xl text-white"></span>
                  </div>
                )}

                {avatar != "undefined" && !isLoading && (
                  <div
                    onClick={handleDeleteAvatar}
                    className="absolute top-0 left-0 w-1/2 h-full rounded-l-full bg-black hover:bg-red-800 transition-bg opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center"
                  >
                    <Trash2 className="w-6 h-6 stroke-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}

                {!isLoading && (
                  <div
                    onClick={openFileSelector}
                    className={`${
                      avatar != "undefined" ? "w-1/2" : "w-full"
                    } absolute top-0 right-0 h-full peer rounded-r-full bg-black hover:bg-sky-800 transition-bg opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center`}
                  >
                    <Pencil className="w-6 h-6 stroke-white opacity-0 peer-hover:opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>

            {avatar != localStorage.getItem("avatar") && (
              <button onClick={uploadAvatar} className="btn btn-circle btn-sm">
                <Check className="w-icon h-icon" />
              </button>
            )}

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
      <Toaster />
    </main>
  );
};
