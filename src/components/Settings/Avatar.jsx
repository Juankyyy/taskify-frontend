import { useRef, useState } from "react";
import { DefaultAvatar } from "../DefaultAvatar";
import { useUser } from "../../hooks/useUser";
import { Pencil, Trash2, Save } from "lucide-react";
import toast from "react-hot-toast";

export const Avatar = () => {
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));
  const [avatarFile, setAvatarFile] = useState(null);
  const { handleChangeAvatar, DeleteAvatar, isLoading } = useUser();
  const fileInputRef = useRef(null);

  const notifyError = (message) => toast.error(message);

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
        notifyError("Por favor selecciona una imagen válida");
      }
    }
  };

  const uploadAvatar = async () => {
    try {
      await handleChangeAvatar(avatarFile);
      setAvatarFile(null);
    } catch (error) {
      console.error("Error al subir avatar:", error);
    }
  };

  // Función para abrir el selector de archivos
  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteAvatar = async () => {
    try {
      await DeleteAvatar();
      setAvatar("undefined");
    } catch (error) {
      console.error("Error al borrar avatar:", error);
    }
  };

  return (
    <>
      <div className="avatar relative group cursor-pointer rounded-full shadow-xl [html[data-theme=dark]_&]:shadow-white/10">
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

      {avatarFile && !isLoading && (
        <button onClick={uploadAvatar} className="btn btn-success">
          <Save className="w-icon h-icon" />
          Guardar
        </button>
      )}
    </>
  );
};
