export const ModalDelete = ({
  title = null,
  handleDelete,
  isLoading,
  type,
  modalId,
}) => {
  const typeLabels = {
    folder: "la carpeta",
    task: "la tarea",
    allTasks: "todas las tareas",
    list: "la lista",
  };

  const typeLabel = typeLabels[type];

  return (
    <dialog id={modalId} className="modal scrollbar-modal">
      <div className="modal-box md:min-w-[550px] md:max-w-2xl">
        <h3 className="font-bold text-lg">
          ¿Eliminar {typeLabel}{" "}
          <span
            className="text-error animate-pulse truncate inline-block align-bottom max-w-[200px]"
            title={title}
          >
            {title}
          </span>
          ?
        </h3>
        <p className="py-4">
          ¿Estás seguro de que deseas eliminar {typeLabel}{" "}
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
            {isLoading && (
                <span className="loading loading-spinner loading-sm mr-1"></span>
              )}
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
