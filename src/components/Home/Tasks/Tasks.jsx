import { Folder } from "lucide-react";
import { useTasks } from "../../../hooks/useTasks";
import { Task } from "./Task";
import { ClipboardList } from "lucide-react";
import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";
import { TaskInfo } from "../../Modals/TaskInfo";
import { CreateTask } from "../../Modals/CreateTask";

export const Tasks = () => {
  const { selectedList, selectedTask } = useTasks();

  return (
    <>
      {selectedList && (
        <section className="bg-base-200 p-5 rounded-xl w-full flex-1 overflow-y-auto"> 
          <div className="flex justify-between items-center">
            <div className="breadcrumbs text-sm text-gray-400">
              <ul>
                <li className="gap-1">
                  <Folder className="w-icon h-icon stroke-gray-400 cursor-default!" />
                  Carpeta
                </li>
                <li className="gap-1 before:opacity-100!">
                  <ClipboardList className="w-icon h-icon stroke-gray-400 cursor-default!" />
                  {selectedList.title}
                </li>
              </ul>
            </div>
            <div className="flex gap-2 items-center">
              <button className="btn btn-info btn-soft p-1 w-8 h-8">
                <Pencil className="stroke-black [html[data-theme=dark]_&]:stroke-white" />
              </button>
              <button className="btn btn-error btn-soft p-1 w-8 h-8">
                <Trash className="stroke-black [html[data-theme=dark]_&]:stroke-white" />
              </button>
            </div>
          </div>

          <div className="flex flex-col mb-8">
            <h1 className="font-bold text-3xl">Tareas</h1>
            <p className="text-gray-400">{selectedList.description}</p>
          </div>

          <div>
            <Task />
          </div>

          {selectedTask && <TaskInfo />}
          <CreateTask />
        </section>
      )}
    </>
  );
};
