import { Trash2 } from "lucide-react";
import { useTasks } from "../../../hooks/useTasks";
import { CreateTaskButton } from "./CreateTaskButton";
import { relativeDate } from "../../../utils/dates";

export const Task = () => {
  const {
    tasks,
    selectedList,
    completeTaskbyId,
    archiveTaskbyId,
    updateSelectedTask,
  } = useTasks();

  const handleCompleteTask = (e, taskId) => {
    e.stopPropagation();

    completeTaskbyId(taskId);
  };

  if (!selectedList) return null;

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <div key={task._id}>
          <div
            onClick={() => updateSelectedTask(task)}
            className="flex items-center justify-between gap-3 p-3 hover:bg-base-200/50 transition-bg rounded-lg cursor-pointer"
          >
            <div className="flex items-center gap-3 justify-center group">
              <input
                type="checkbox"
                checked={task.completed}
                className="checkbox checkbox-info cursor-default"
                onClick={(e) => handleCompleteTask(e, task._id)}
                onChange={() => {}}
              />
              <h1 className="group-has-[:checked]:line-through">
                {task.title}
              </h1>
            </div>
            <div className="flex gap-4 items-center">
              <div>
                <p className="text-gray-300 [html[data-theme=light]_&]:text-gray-500">{relativeDate(task.createdAt)}</p>
              </div>
              <div
                className={`badge badge-soft badge-outline bg-base-200/50 ${
                  task.priority == "low" && "badge-info"
                } ${task.priority == "medium" && "badge-warning"} ${
                  task.priority == "high" && "badge-error"
                }`}
              >
                <span
                  className={`indicator-item status ${
                    task.priority == "low" && "status-info"
                  } ${task.priority == "medium" && "status-warning"} ${
                    task.priority == "high" && "status-error"
                  }`}
                ></span>
                <p className="font-medium">{task.priority}</p>
              </div>
              <Trash2
                onClick={(e) => {
                  e.stopPropagation();
                  archiveTaskbyId(task);
                }}
                className="w-icon h-icon cursor-pointer hover:animate-tada hover:stroke-red-600"
              />
            </div>
          </div>
        </div>
      ))}
      {tasks.length === 0 && (
        <p className="text-center text-gray-500 py-2">No hay tareas</p>
      )}
      <CreateTaskButton />
    </div>
  );
};
