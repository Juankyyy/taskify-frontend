import { Plus } from "lucide-react";

export const CreateTaskButton = () => {
  return (
    <div className="animate-fade-in flex justify-center">
      <div
        onClick={() => document.getElementById("create-task-modal").showModal()}
        className="group hover:shadow-lg cursor-pointer tranform hover:scale-105 transition-all border-2 hover:border-transparent border-dashed border-blue-300 hover:bg-sky-300 rounded-lg flex gap-2 items-center justify-center sm:w-2/4 w-2/3  sm:h-14 h-10 [html[data-theme=dark]_&]:hover:bg-sky-400"
      >
        <Plus className="stroke-2 w-6 h-6 stroke-gray-500 group-hover:stroke-black" />
        <h1 className="text-gray-500 text-xl group-hover:text-black">
          Nueva tarea
        </h1>
      </div>
    </div>
  );
};
