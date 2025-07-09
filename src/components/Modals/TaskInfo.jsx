import { useTasks } from "../../hooks/useTasks";

export const TaskInfo = () => {
  const { selectedTask } = useTasks();

  return (
    <dialog id="task-info-modal" className="modal">
      <div className="modal-box">
        <div>
          <div className="flex items-center gap-3 group">
            <input
              type="checkbox"
              className="checkbox checkbox-info cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
            <h1 className="font-bold text-2xl group-has-[:checked]:line-through">
              {selectedTask.title}
            </h1>
          </div>
        </div>
        <p className="py-4">{selectedTask.description}</p>
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
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
