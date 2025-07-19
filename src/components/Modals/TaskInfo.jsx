import { Text, BadgeAlert } from "lucide-react";
import { useEffect } from "react";
import { relativeDate } from "../../utils/dates";
import { useTasks } from "../../hooks/useTasks";
import { useModalCreate } from "../../hooks/useModalCreate";

export const TaskInfo = () => {
  const { selectedTask, updateTaskbyId, isLoading } =
    useTasks();

  const initialForm = {
    id: "",
    title: "",
    description: "",
    priority: "",
    completed: false,
  };

  const { formState, onInputChange, onSubmit, setFormState } = useModalCreate(
    initialForm,
    updateTaskbyId,
    "task-edit"
  );

  // Actualizar el formulario cuando selectedTask cambie
  useEffect(() => {
    if (selectedTask) {
      setFormState({
        id: selectedTask._id,
        title: selectedTask.title,
        description: selectedTask.description,
        priority: selectedTask.priority,
        completed: selectedTask.completed,
      });
    }
  }, [selectedTask, setFormState]);

  const onCheckboxChange = (e) => {
    setFormState({
      ...formState,
      completed: e.target.checked,
    });
  };

  return (
    <dialog id="task-info-modal" className="modal">
      {selectedTask && (
        <>
          <form className="modal-box flex flex-col gap-4" onSubmit={onSubmit}>
            <div>
              <div className="flex items-center gap-3 group">
                <input
                  name="completed"
                  checked={formState.completed}
                  type="checkbox"
                  className="checkbox checkbox-info cursor-default"
                  onChange={onCheckboxChange}
                />
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

            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <BadgeAlert className="w-icon h-icon stroke-slate-600 [html[data-theme=dark]_&]:stroke-slate-300" />
                <p>Prioridad</p>
              </div>
              <select
                name="priority"
                value={formState.priority}
                onChange={onInputChange}
                required
                className="select w-full transition-all focus:outline-0 focus:border-black [html[data-theme=dark]_&]:focus:border-white focus:rounded-md"
              >
                <option disabled={true}>Prioridad</option>
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Baja</option>
              </select>
            </div>

            <div
              className={`badge badge-soft badge-outline ${
                selectedTask.priority == "low" && "badge-info"
              } ${selectedTask.priority == "medium" && "badge-warning"} ${
                selectedTask.priority == "high" && "badge-error"
              }`}
            >
              <span
                className={`indicator-item status ${
                  selectedTask.priority == "low" && "status-info"
                } ${selectedTask.priority == "medium" && "status-warning"} ${
                  selectedTask.priority == "high" && "status-error"
                }`}
              ></span>
              {selectedTask.priority}
            </div>

            <div>
              <p className="text-gray-300 [html[data-theme=light]_&]:text-gray-500">
                creada {relativeDate(selectedTask.createdAt)}
              </p>
              <p className="text-gray-300 [html[data-theme=light]_&]:text-gray-500">
                última modificación {relativeDate(selectedTask.updatedAt)}
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
