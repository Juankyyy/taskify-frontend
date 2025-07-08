import { Folder } from "lucide-react";
import { useTasks } from "../../../hooks/useTasks";
import { Task } from "./Task";
import { ClipboardList } from "lucide-react";
import { Plus } from "lucide-react";
import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";

export const Tasks = () => {
  const { selectedList } = useTasks();

  return (
    <section className="bg-base-200 p-5 rounded-xl w-full h-full">
      <div className="flex justify-between items-center">
        <div className="breadcrumbs text-sm text-gray-500">
          <ul>
            <li className="gap-1">
              <Folder className="w-icon h-icon stroke-gray-500 cursor-default!" />
              Home
            </li>
            <li className="gap-1 before:opacity-100!">
              <ClipboardList className="w-icon h-icon stroke-gray-500 cursor-default!" />
              {selectedList.title}
            </li>
          </ul>
        </div>
        <div className="flex gap-2 items-center">
          <button className="btn btn-info p-1 w-8 h-8">
            <Pencil className="stroke-white" />
          </button>
          <button className="btn btn-error p-1 w-8 h-8">
            <Trash className="stroke-white" />
          </button>
        </div>
      </div>

      <p className="text-gray-400">{selectedList.description}</p>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-3xl">Tareas</h1>
      </div>

      <div>
        <Task />
      </div>
    </section>
  );
};
