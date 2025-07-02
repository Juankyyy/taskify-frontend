import { Folder } from "lucide-react";
import { useModalCreate } from "../../hooks/useModalCreate";

export const CreateFolder = ({ handleCreateFolder, isLoading }) => {
  const initialForm = {
    folderName: "",
  };

  const { folderName, onInputChange, onSubmit } = useModalCreate(
    initialForm,
    handleCreateFolder
  );

  return (
    <dialog id="create-folder-modal" className="modal">
      <div className="modal-box md:w-96">
        <h3 className="font-bold text-lg">Nueva carpeta</h3>
        <form className="mt-4" onSubmit={onSubmit}>
          <label className="input w-full">
            <Folder className="w-icon h-icon" />
            <input
              name="folderName"
              value={folderName}
              required
              minLength="3"
              maxLength="15"
              title="Mínimo 3 caracteres, máximo 15"
              type="text"
              className="grow"
              placeholder="Nombre de la carpeta"
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
