import { Text, BadgeAlert } from "lucide-react";
import { useEffect } from "react";
import { relativeDate } from "../../utils/dates";
import { useFolders } from "../../hooks/useFolders";
import { useFormModal } from "../../hooks/useFormModal";

export const ListInfo = () => {
  const { selectedList, updateList, isLoading } = useFolders();

  const initialForm = {
    id: "",
    title: "",
    description: ""
  };

  const { formState, onInputChange, onSubmit, setFormState } = useFormModal(
    initialForm,
    updateList,
    "list-edit"
  );

  // Actualizar el formulario cuando selectedList cambie
  useEffect(() => {
    if (selectedList) {
      setFormState({
        id: selectedList._id,
        title: selectedList.title,
        description: selectedList.description
      });
    }
  }, [selectedList, setFormState]);

  return (
    <dialog id="list-info-modal" className="modal modal-top sm:modal-middle">
      {selectedList && (
        <>
          <form className="modal-box flex flex-col gap-4" onSubmit={onSubmit}>
            <div>
              <div className="flex items-center gap-3 group">
                <input
                  type="text"
                  placeholder="Título de la tarea"
                  className="input input-ghost rounded-none font-bold text-2xl group-has-[:checked]:line-through p-0 border-b focus:border-b-black [html[data-theme=dark]_&]:focus:border-b-white focus:outline-0"
                  name="title"
                  value={formState.title}
                  onChange={onInputChange}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <Text className="w-icon h-icon stroke-slate-600 [html[data-theme=dark]_&]:stroke-slate-300" />
                <p>Descripción</p>
              </div>
              <textarea
                className="textarea w-full transition-border-color shadow-none border-transparent resize-none hover:border-[#ecf9ff33] focus:outline-0 focus:border-black [html[data-theme=dark]_&]:focus:border-white focus:rounded-md"
                placeholder="Escribe una descripción"
                name="description"
                value={formState.description}
                onChange={onInputChange}
              ></textarea>
            </div>

            <div>
              <p className="text-gray-300 [html[data-theme=light]_&]:text-gray-500">
                creada {relativeDate(selectedList.createdAt)}
              </p>
              <p className="text-gray-300 [html[data-theme=light]_&]:text-gray-500">
                última modificación {relativeDate(selectedList.updatedAt)}
              </p>
            </div>

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
