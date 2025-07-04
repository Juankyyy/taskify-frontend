import { Folder } from "lucide-react";
import { useModalCreate } from "../../hooks/useModalCreate";
import { ClipboardList } from "lucide-react";

export const CreateFolder = ({
  handleCreate,
  isLoading,
  initialForm,
  type = "folder",
}) => {
  const { formState, onInputChange, onSubmit } = useModalCreate(
    initialForm,
    handleCreate,
    type
  );

  const isFolder = type === "folder";

  const Icon = isFolder ? (
    <Folder className="w-icon h-icon" />
  ) : (
    <ClipboardList className="w-icon h-icon" />
  );
  
  const modalId = isFolder ? "create-folder-modal" : "create-list-modal";
  const title = isFolder ? "Nueva carpeta" : "Nueva lista";
  const inputName = isFolder ? "folderName" : "title";
  const value = isFolder ? formState.folderName : formState.title;
  const placeholder = isFolder ? "Nombre de la carpeta" : "Nombre de la lista";

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box md:w-96">
        <h3 className="font-bold text-lg">{title}</h3>
        <form className="mt-4" onSubmit={onSubmit}>
          <label className="input w-full">
            {Icon}
            <input
              name={inputName}
              value={value}
              required
              minLength="3"
              maxLength="30"
              title="Mínimo 3 caracteres, máximo 30"
              type="text"
              className="grow"
              placeholder={placeholder}
              onChange={onInputChange}
            />
          </label>
          <div className="flex justify-end mt-4">
            <button type="submit" className="btn btn-success">
              {isLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Crear"
              )}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>Cerrar</button>
      </form>
    </dialog>
  );
};
