import { ClipboardList } from "lucide-react";
import { Text } from "lucide-react";
import { BookCheck } from "lucide-react";
import { useTasks } from "../../hooks/useTasks";
import { useModalCreate } from "../../hooks/useModalCreate";

export const CreateTask = () => {
  const { selectedList, selectedFolderId, createTaskbyId, isLoading } =
    useTasks();

  const initialForm = {
    title: "",
    description: "",
    priority: "",
    listId: "",
    folderId: "",
  };

  const { formState, onInputChange, onSubmit } = useModalCreate(
    initialForm,
    createTaskbyId,
    "task"
  );

  if (formState.listId === "" || formState != selectedList._id) {
    formState.listId = selectedList._id;
    formState.folderId = selectedFolderId;
  }

  return (
    <dialog id="create-task-modal" className="modal">
      <div className="modal-box">
        <div className="flex gap-2 items-center">
          <ClipboardList className="w-4 h-4 stroke-gray-500 [html[data-theme=dark]_&]:stroke-gray-400" />
          <p className="text-sm text-gray-500 [html[data-theme=dark]_&]:text-gray-400">
            {selectedList.title}
          </p>
        </div>
        <h3 className="font-bold text-lg">Nueva tarea</h3>
        <form className="mt-4 flex flex-col gap-3" onSubmit={onSubmit}>
          <label className="input w-full transition-all focus-within:outline-0 focus-within:border-black [html[data-theme=dark]_&]:focus-within:border-white focus-within:rounded-md">
            <BookCheck className="w-icon h-icon stroke-slate-600 [html[data-theme=dark]_&]:stroke-slate-300" />
            <input
              name="title"
              value={formState.title}
              required
              minLength="3"
              maxLength="30"
              title="Mínimo 3 caracteres, máximo 30"
              type="text"
              className="grow"
              placeholder="Nombre de la tarea"
              onChange={onInputChange}
            />
          </label>

          <label className="input w-full transition-all focus-within:outline-0 focus-within:border-black [html[data-theme=dark]_&]:focus-within:border-white focus-within:rounded-md">
            <Text className="w-icon h-icon stroke-slate-600 [html[data-theme=dark]_&]:stroke-slate-300" />
            <input
              name="description"
              value={formState.description}
              maxLength="99"
              title="Mínimo 3 caracteres, máximo 90"
              type="text"
              className="grow"
              placeholder="Descripción de la tarea"
              onChange={onInputChange}
            />
          </label>

          <select
            name="priority"
            value={formState.priority}
            defaultValue="Prioridad"
            onChange={onInputChange}
            required
            className="select w-full transition-all focus:outline-0 focus:border-black [html[data-theme=dark]_&]:focus:border-white focus:rounded-md"
          >
            <option value="" disabled={true}>Prioridad</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>

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
        <button>close</button>
      </form>
    </dialog>
  );
};
