import { Folder, ClipboardList } from "lucide-react";
import { useModalCreate } from "../../hooks/useModalCreate";

export const CreateFolder = ({
  handleCreate,
  isLoading,
  initialForm,
  type,
  selectedFolderTitle,
}) => {
  const { formState, onInputChange, onSubmit } = useModalCreate(
    initialForm,
    handleCreate,
    type
  );

  const isFolder = type === "folder";

  const icon = isFolder ? (
    <Folder className="w-icon h-icon stroke-slate-600 [html[data-theme=dark]_&]:stroke-slate-300" />
  ) : (
    <ClipboardList className="w-icon h-icon stroke-slate-600 [html[data-theme=dark]_&]:stroke-slate-300" />
  );

  const modalId = isFolder ? "create-folder-modal" : "create-list-modal";
  const title = isFolder ? "Nueva carpeta" : "Nueva lista";
  const inputName = isFolder ? "folderName" : "title";
  const value = isFolder ? formState.folderName : formState.title;
  const placeholder = isFolder ? "Nombre de la carpeta" : "Nombre de la lista";

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box md:w-96">
        <div className="flex gap-2 items-center">
          {!isFolder && (
            <Folder className="w-4 h-4 stroke-gray-500 [html[data-theme=dark]_&]:stroke-gray-400" />
          )}
          <p className="text-sm text-gray-500 [html[data-theme=dark]_&]:text-gray-400">
            {!isFolder && selectedFolderTitle}
          </p>
        </div>
        <h3 className="font-bold text-lg">{title}</h3>
        <form className="mt-4" onSubmit={onSubmit}>
          <label className="input w-full transition-all focus-within:outline-0 focus-within:border-black [html[data-theme=dark]_&]:focus-within:border-white focus-within:rounded-md">
            {icon}
            <input
              name={inputName}
              value={value}
              required
              minLength="3"
              maxLength="30"
              title="Mínimo 3 caracteres, máximo 30"
              type="text"
              className="grow "
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
