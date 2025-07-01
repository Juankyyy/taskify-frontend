export const DeleteFolder = ({ title, handleDeleteFolder }) => {
  return (
    <dialog id="delete-folder-modal" className="modal scrollbar-modal">
      <div className="modal-box min-w-[550px] max-w-2xl">
        <h3 className="font-bold text-lg">
          ¿Eliminar carpeta{" "}
          <span className="text-error animate-pulse truncate inline-block align-bottom max-w-[200px]">
            {title}
          </span>
          ?
        </h3>
        <p className="py-4">
          ¿Estás seguro de que deseas eliminar la carpeta{" "}
          <span className="font-bold truncate inline-block align-bottom max-w-[200px]">
            {title}
          </span>
          ?
          <br />
          Esta acción no se puede deshacer.
        </p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-4">
            <button className="btn">Cerrar</button>
            <button
              onClick={handleDeleteFolder}
              type="button"
              className="btn btn-error"
            >
              Eliminar
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
