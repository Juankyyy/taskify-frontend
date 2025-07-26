import { useEffect } from "react";
import { ArchiveRestore, Trash2, Shredder } from "lucide-react";
import { relativeDate } from "../../utils/dates";
import { useTasks } from "../../hooks/useTasks";
import { useState } from "react";

export const Trash = () => {
  const {
    getTrashTasks,
    deletedTasks: originalDeletedTasks,
    isLoading,
    emptyTrashTasks,
    restoreTaskbyId,
    deleteTaskbyId,
  } = useTasks();

  const [deletedTasks, setDeletedTasks] = useState(originalDeletedTasks);

  useEffect(() => {
    getTrashTasks();
  }, []);

  useEffect(() => {
    setDeletedTasks(originalDeletedTasks);
  }, [originalDeletedTasks]);

  const handleRestoreTask = async (task) => {
    setDeletedTasks(
      (prevTasks) => prevTasks.filter((t) => t._id !== task._id) // Todas las tareas menos la que seleccione
    );

    try {
      await restoreTaskbyId(task);
    } catch {
      setDeletedTasks((prevTasks) => [...prevTasks, task]);
    }
  };

  const handleDeleteTask = async (task) => {
    setDeletedTasks(
      (prevTasks) => prevTasks.filter((t) => t._id !== task._id) // Todas las tareas menos la que seleccione
    );

    try {
      await deleteTaskbyId(task);
    } catch {
      // Revertir en caso de error
      setDeletedTasks((prevTasks) => [...prevTasks, task]);
    }
  };

  return (
    <section className="bg-base-200/50 sm:p-5 p-4 rounded-xl w-full flex-1 overflow-y-auto">
      <div className="flex flex-col mb-8">
        <div className="flex justify-between items-center">
          <h1 className="font-bold sm:text-3xl text-xl">Papelera</h1>
          {deletedTasks.length === 0 ? (
            ""
          ) : (
            <button
              onClick={emptyTrashTasks}
              className="btn btn-error btn-outline btn-sm"
            >
              <Shredder className="w-4 h-4" />
              Vaciar Papelera
            </button>
          )}
        </div>
        <p className="text-gray-400">Tareas eliminadas</p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-5">
          <div className="loading loading-dots loading-lg mb-4"></div>
          <p className="text-gray-500">Cargando tareas eliminadas...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 overflow-y-auto sm:max-h-[650px] max-h-[230px]">
          {deletedTasks.map((task) => (
            <div key={task._id} className="flex justify-center items-center">
              <div className="flex w-full h-12 px-3 items-center justify-between gap-3 hover:bg-base-200/50 rounded-lg transition-border-color-bg">
                <div className="flex items-center gap-3 justify-center group px-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="checkbox checkbox-info cursor-not-allowed"
                    disabled
                    onChange={() => {}}
                  />
                  <h1
                    title={task.title}
                    className="group-has-[:checked]:line-through text-gray-500 truncate inline-block max-w-[100px] sm:max-w-[250px]"
                  >
                    {task.title}
                  </h1>
                </div>
                <div className="flex h-full gap-4 items-center">
                  <p
                    className="text-gray-300 [html[data-theme=light]_&]:text-gray-500 sm:block hidden"
                    title={`Creado ${relativeDate(task.updatedAt)}`}
                  >
                    Eliminado {relativeDate(task.updatedAt)}
                  </p>

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
                    {task.priority}
                  </div>

                  <div className="flex gap-1 h-full items-center">
                    <div
                      onClick={() => handleRestoreTask(task)}
                      className="flex h-full px-2 justify-center items-center cursor-pointer group"
                    >
                      <ArchiveRestore className="w-icon h-icon group-hover:stroke-green-600" />
                    </div>

                    <div
                      onClick={() => handleDeleteTask(task)}
                      className="flex h-full px-2 justify-center items-center cursor-pointer group"
                    >
                      <Trash2 className="w-icon h-icon cursor-pointer group-hover:stroke-red-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {deletedTasks.length === 0 && (
            <div className="text-center py-12">
              <Trash2 className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No hay tareas eliminadas</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
