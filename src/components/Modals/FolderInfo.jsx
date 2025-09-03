import { Folder } from "lucide-react";
import { useEffect } from "react";
import { useFolders } from "../../hooks/useFolders";
import { useFormModal } from "../../hooks/useFormModal";

export const FolderInfo = () => {
  const { modalSelectedFolder, updateFolder, isLoading } = useFolders();

  const initialForm = {
    id: "",
    name: "",
  };

  const { formState, onInputChange, onSubmit, setFormState } = useFormModal(
    initialForm,
    updateFolder,
    "folder-edit"
  );

  // Actualizar el formulario cuando modalSelectedFolder cambie
  useEffect(() => {
    if (modalSelectedFolder) {
      setFormState({
        id: modalSelectedFolder.folderId,
        name: modalSelectedFolder.title,
      });
    }
  }, [modalSelectedFolder, setFormState]); // se ejecuta siempre que le dan a crear nueva lista
 
  return (
    <dialog id="folder-info-modal" className="modal modal-top sm:modal-middle">
      {modalSelectedFolder && (
        <>
          <form className="modal-box md:w-96 flex flex-col gap-4" onSubmit={onSubmit}>
            <h3 className="font-bold text-lg">Editar Carpeta</h3>
            <label className="input w-full transition-all focus-within:outline-0 focus-within:border-black [html[data-theme=dark]_&]:focus-within:border-white focus-within:rounded-md">
              <Folder className="w-icon h-icon stroke-slate-600 [html[data-theme=dark]_&]:stroke-slate-300" />
              <input
                name="name"
                value={formState.name || ""}
                required
                minLength="3"
                maxLength="30"
                title="Mínimo 3 caracteres, máximo 30"
                type="text"
                className="grow "
                placeholder="Nombre de la carpeta"
                onChange={onInputChange}
              />
            </label>

            <div className="flex justify-end mt-4">
              <button type="submit" className="btn btn-info">
                {isLoading && (
                  <span className="loading loading-spinner loading-sm mr-1"></span>
                )}
                Guardar
              </button>
            </div>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </>
      )}
    </dialog>
  );
};
