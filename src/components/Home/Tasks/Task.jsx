import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { relativeDate } from "../../../utils/dates";
import { useTasks } from "../../../hooks/useTasks";
import { useFolders } from "../../../hooks/useFolders";
import { CreateTaskButton } from "./CreateTaskButton";

export const Task = () => {
  const {
    tasks: originalTasks,
    completeTaskbyId,
    archiveTaskbyId,
    updateSelectedTask,
  } = useTasks();

  const { selectedList } = useFolders();

  // Estado local para manejar las tareas
  const [tasks, setTasks] = useState(originalTasks);

  // Sincronizar con las tareas originales cuando cambien
  useEffect(() => {
    setTasks(originalTasks);
  }, [originalTasks]);

  const handleCompleteTask = async (e, taskId) => {
    e.stopPropagation();

    // Cambiar manualmente el completed en el estado local
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    try {
      await completeTaskbyId(taskId);
    } catch {
      // Revertir en caso de error
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    }
  };

  const handleArchiveTask = async (e, task) => {
    e.stopPropagation();

    setTasks(
      (prevTasks) => prevTasks.filter((t) => t._id !== task._id) // Todas las tareas menos la que seleccioné
    );

    try {
      await archiveTaskbyId(task);
    } catch {
      // Revertir en caso de error
      setTasks(
        (prevTasks) => prevTasks.filter((t) => t._id !== task._id) // Todas las tareas menos la que seleccioné
      );
    }
  };

  if (!selectedList) return null;

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <div key={task._id} className="flex justify-center items-center">
          <div
            onClick={() => updateSelectedTask(task)}
            className="flex w-full h-12 px-3 items-center justify-between gap-3 hover:bg-base-200/50 transition-bg rounded-lg cursor-pointer"
          >
            <div className="flex items-center gap-1 justify-center group h-full">
              <div
                onClick={(e) => handleCompleteTask(e, task._id)}
                className="h-full flex items-center cursor-default px-2"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  className="checkbox checkbox-info"
                  onChange={() => {}}
                />
              </div>
              <h1 className="group-has-[:checked]:line-through">
                {task.title}
              </h1>
            </div>
            <div className="flex h-full gap-4 items-center">
              <div>
                <p className="text-gray-300 [html[data-theme=light]_&]:text-gray-500">
                  {relativeDate(task.createdAt)}
                </p>
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
              <div
                onClick={(e) => handleArchiveTask(e, task)}
                className="flex h-full px-2 justify-center items-center cursor-pointer hover:animate-tada group"
              >
                <Trash2 className="w-icon h-icon group-hover:stroke-red-600" />
              </div>
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
