import { Trash } from "lucide-react";
import { Plus } from "lucide-react";
import { Tooltip } from "../Tooltip";
import { useState } from "react";
import { ConfirmModal } from "../confirmModal";

export const FolderActions = ({ folderId, onDeleteSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/folders/delete/${folderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setIsModalOpen(false); // Cierra el modal
        if (onDeleteSuccess) {
          onDeleteSuccess(); // Ejecuta callback para recargar carpetas
        }
      } else {
        alert(`Error: ${data.message}`); // Error controlado del backend
      }
    } catch (error) {
      alert(
        "Error al eliminar la carpeta. Por favor, inténtalo de nuevo más tarde."
      );
      console.error("Error deleting folder:", error); // Error de red u otro
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 z-20 overflow-visible">
      <Tooltip title={"Nueva lista"}>
        <Plus className="w-7 h-7 p-1 stroke-3 stroke-slate-400 cursor-pointer rounded-full transition-colors hover:bg-green-600 hover:stroke-white hover:animate-pop hover:animate-duration-500" />
      </Tooltip>

      <Tooltip title={"Eliminar lista"}>
        <Trash
          onClick={() => setIsModalOpen(true)}
          className="w-icon h-7 stroke-3 stroke-slate-400 cursor-pointer hover:animate-tada  hover:stroke-red-600"
        />
      </Tooltip>

      {/* Modal */}
      <ConfirmModal
        isOpen={isModalOpen} // Modal visible si isModalOpen es true
        onClose={() => setIsModalOpen(false)} // Cierra el modal
        onConfirm={handleDelete} // Elimina la carpeta si confirma
        title="¿Eliminar Carpeta?"
        message="¿Estás seguro de que deseas eliminar esta carpeta? Esta acción no se puede deshacer."
      />
    </div>
  );
};
