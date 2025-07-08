import { ChevronDown } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useTasks } from "../../../hooks/useTasks";
import { CreateTaskButton } from "./CreateTaskButton";

export const Task = () => {
  const { tasks, selectedList } = useTasks();

  return (
    <div className="flex flex-col gap-3">
      {selectedList &&
        tasks.map((task) => (
          <div key={task._id}>
            <div className="flex items-center justify-between gap-3 p-3">
              <div className="flex items-center gap-3 justify-center group">
                <input type="checkbox" className="checkbox checkbox-info" />
                <h1 className="group-has-[:checked]:line-through">
                  {task.title}
                </h1>
              </div>
              <div className="flex gap-4 items-center">
                <div className="badge badge-soft badge-outline badge-info">
                  <span className="indicator-item status status-info"></span>
                  {task.priority}
                </div>
                <ChevronDown className="w-icon h-icon" />
                <Trash2 className="w-icon h-icon cursor-pointer hover:animate-tada hover:stroke-red-600" />
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
  );
};
