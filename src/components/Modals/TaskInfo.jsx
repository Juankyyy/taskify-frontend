import { useTasks } from "../../hooks/useTasks";

export const TaskInfo = () => {
  const { selectedTask } = useTasks();

  return (
    <dialog id="task-info-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{selectedTask.title}</h3>
        <p className="py-4">{selectedTask.description}</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
