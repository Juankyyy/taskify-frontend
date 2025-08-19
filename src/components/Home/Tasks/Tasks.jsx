import { useEffect } from "react";
import { Folder, ClipboardList, Pencil, Trash } from "lucide-react";
import { useTasks } from "../../../hooks/useTasks";
import { useFolders } from "../../../hooks/useFolders";
import { Task } from "./Task";
import { TaskInfo } from "../../Modals/TaskInfo";
import { CreateTask } from "../../Modals/CreateTask";
import { ModalDelete } from "../../Modals/ModalDelete";
import { ListInfo } from "../../Modals/ListInfo";

export const Tasks = () => {
  const { getTasksByList, isLoading: isLoadingTasks } = useTasks();

  const {
    deleteListById,
    selectedList,
    selectedFolder,
    isLoading: isLoadingList,
  } = useFolders();

  useEffect(() => {
    if (selectedList) {
      getTasksByList();
    }
  }, [selectedList]);

  if (!selectedList) return null;

  return (
    <section className="bg-base-200/50 sm:p-5 p-4 pt-2 sm:rounded-xl rounded-b-xl w-full flex-1 h-full">
      <div className="flex justify-between items-center">
        <div className="breadcrumbs text-sm text-gray-300 [html[data-theme=light]_&]:text-gray-500">
          <ul>
            <li className="gap-1">
              <Folder className="w-icon h-icon stroke-gray-300 [html[data-theme=light]_&]:stroke-gray-500 cursor-default!" />
              {selectedFolder.name}
            </li>
            <li className="gap-1 before:opacity-100!">
              <ClipboardList className="w-icon h-icon stroke-gray-300 [html[data-theme=light]_&]:stroke-gray-500 cursor-default!" />
              {selectedList.title}
            </li>
          </ul>
        </div>
        <div className="flex gap-2 items-center">
          <div title="Editar lista">
            <button
              onClick={() =>
                document.getElementById("list-info-modal").showModal()
              }
              className="btn btn-info btn-soft p-1 w-8 h-8 group"
            >
              <Pencil className="stroke-black group-hover:stroke-white [html[data-theme=dark]_&]:stroke-white" />
            </button>
          </div>
          <div title="Eliminar lista">
            <button
              onClick={() =>
                document.getElementById("delete-list-modal").showModal()
              }
              className="btn btn-error btn-soft p-1 w-8 h-8 group"
            >
              <Trash className="stroke-black group-hover:stroke-white [html[data-theme=dark]_&]:stroke-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:mb-8 mb-1">
        <h1 className="font-bold sm:text-3xl text-xl">Tareas</h1>
        <p className="text-gray-400">{selectedList.description}</p>
      </div>

      {isLoadingTasks ? (
        <div className="flex flex-col items-center justify-center py-5">
          <div className="loading loading-dots loading-lg mb-4"></div>
          <p className="text-gray-500">Cargando tareas...</p>
        </div>
      ) : (
        <Task />
      )}

      <TaskInfo />
      <ListInfo />
      <CreateTask />

      <ModalDelete
        title={selectedList.title}
        handleDelete={deleteListById}
        isLoading={isLoadingList}
        type="list"
        modalId="delete-list-modal"
      />
    </section>
  );
};
