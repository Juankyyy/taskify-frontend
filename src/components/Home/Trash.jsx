import { useEffect } from "react";
import { ArchiveRestore, Trash2, Shredder } from "lucide-react";
import { relativeDate } from "../../utils/dates";
import { useTasks } from "../../hooks/useTasks";

export const Trash = () => {
  const {
    getTrashTasks,
    deletedTasks,
    isLoading,
    emptyTrashTasks,
    restoreTaskbyId,
    deleteTaskbyId,
  } = useTasks();

  useEffect(() => {
    getTrashTasks();
  }, []);

  return (
    <section className="bg-base-200/50 p-5 rounded-xl w-full flex-1 overflow-y-auto">
      <div className="flex flex-col mb-8">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl">Papelera</h1>
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
        <div className="flex flex-col gap-3">
          {deletedTasks.map((task) => (
            <div key={task._id}>
              <div className="flex items-center justify-between gap-3 p-3 hover:bg-base-200/50 rounded-lg transition-border-color-bg">
                <div className="flex items-center gap-3 justify-center group">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="checkbox checkbox-info cursor-not-allowed"
                    disabled
                    onChange={() => {}}
                  />
                  <h1 className="group-has-[:checked]:line-through text-gray-500">
                    {task.title}
                  </h1>
                </div>
                <div className="flex gap-4 items-center">
                  <p
                    className="text-gray-300 [html[data-theme=light]_&]:text-gray-500"
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

                  <ArchiveRestore
                    onClick={() => restoreTaskbyId(task)}
                    className="w-icon h-icon cursor-pointer hover:stroke-green-600"
                  />
                  <Trash2
                    onClick={() => deleteTaskbyId(task)}
                    className="w-icon h-icon cursor-pointer hover:stroke-red-600"
                  />
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
