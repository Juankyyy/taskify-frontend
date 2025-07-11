import { Trash2 } from "lucide-react";
import { useTasks } from "../../../hooks/useTasks";
import { CreateTaskButton } from "./CreateTaskButton";

export const Task = () => {
  const { tasks, selectedList, completeTaskbyId, updateSelectedTask } =
    useTasks();

  const handleCompleteTask = (e, taskId) => {
    e.stopPropagation();

    completeTaskbyId(taskId);
  };

  return (
    <>
      {selectedList && (
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <div key={task._id}>
              <div
                onClick={() => updateSelectedTask(task)}
                className="flex items-center justify-between gap-3 p-3 hover:bg-base-100 rounded-lg cursor-pointer"
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
                  <div
                    className={`badge badge-soft badge-outline ${
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
                    {task.priority}
                  </div>
                  <Trash2
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="w-icon h-icon cursor-pointer hover:animate-tada hover:stroke-red-600"
                  />
                </div>
              </div>
              <div className="flex justify-center py-2">
                <div className="w-[95%] border-b border-gray-300 [html[data-theme=dark]_&]:border-gray-700"></div>
              </div>
            </div>
          ))}
          {tasks.length === 0 && (
            <p className="text-center text-gray-500 py-2">No hay tareas</p>
          )}
          <CreateTaskButton />
        </div>
      )}
    </>
  );
};
