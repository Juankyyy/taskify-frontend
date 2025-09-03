import { useFormModal } from "../../hooks/useFormModal";
import { useFolders } from "../../hooks/useFolders";
import { ArrowLeftRight } from "lucide-react";
import { useTasks } from "../../hooks/useTasks";
import { useEffect } from "react";

export const TaskMove = () => {
  const { lists } = useFolders();
  const { moveTask, selectedTask, isLoading } = useTasks();

  const initialForm = {
    task: "",
    newListId: "",
  };

  const { onInputChange, setFormState, onSubmit } = useFormModal(
    initialForm,
    moveTask,
    "move-task"
  );

  useEffect(() => {
    if (selectedTask) {
      setFormState({
        task: selectedTask,
      });
    }
  }, [selectedTask, setFormState]);

  return (
    <dialog id="move-task-modal" className="modal modal-top sm:modal-middle">
      <div className="modal-box md:w-96">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-icon h-icon stroke-slate-600 [html[data-theme=dark]_&]:stroke-slate-300" />
          <h3 className="font-bold text-lg">Mover tarea</h3>
        </div>
        <form className="mt-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-1">
            <select
              name="newListId"
              defaultValue="Lista"
              onChange={onInputChange}
              required
              className="select w-full transition-all focus:outline-0 focus:border-black [html[data-theme=dark]_&]:focus:border-white focus:rounded-md"
            >
              <option disabled={true}>Lista</option>
              {lists.map((list) => (
                <option key={list._id} value={list._id}>
                  {list.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end mt-4">
            <button type="submit" className="btn btn-primary">
              {isLoading && (
                <span className="loading loading-spinner loading-sm mr-1"></span>
              )}
              Mover
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
