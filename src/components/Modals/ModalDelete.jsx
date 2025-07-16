export const ModalDelete = ({ title, handleDelete, type, modalId }) => {
  const typeLabels = {
    folder: "carpeta",
    task: "tarea",
    list: "lista",
  };

  const typeLabel = typeLabels[type];

  return (
    <dialog id={modalId} className="modal scrollbar-modal">
      <div className="modal-box md:min-w-[550px] md:max-w-2xl">
        <h3 className="font-bold text-lg">
          ¿Eliminar la {typeLabel}{" "}
          <span
            className="text-error animate-pulse truncate inline-block align-bottom max-w-[200px]"
            title={title}
          >
            {title}
          </span>
          ?
        </h3>
        <p className="py-4">
          ¿Estás seguro de que deseas eliminar la {typeLabel}{" "}
          <span
            className="font-bold truncate inline-block align-bottom max-w-[200px]"
            title={title}
          >
            {title}
          </span>
          ?
          <br />
          Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            type="button"
            className="btn btn-error"
          >
            Eliminar
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>Cerrar</button>
      </form>
    </dialog>
  );
};
