import { ChevronDown } from "lucide-react";
import { Trash2 } from "lucide-react";

export const Task = () => {
  // 🧠 Logic

  return (
    <>
      <div className="flex items-center justify-between gap-3 p-3">
        <div className="flex items-center gap-3 justify-center group">
          <input type="checkbox" className="checkbox checkbox-info" />
          <h1 className="group-has-[:checked]:line-through">Task 1</h1>
        </div>
        <div className="flex gap-4 items-center">
          <div className="badge badge-soft badge-outline badge-info">
            <span className="indicator-item status status-info"></span>
            Low
          </div>
          <ChevronDown className="w-icon h-icon" />
          <Trash2 className="w-icon h-icon cursor-pointer hover:animate-tada  hover:stroke-red-600" />
        </div>
      </div>

      <div className="flex justify-center py-2">
        <div className="w-[95%] border-b border-gray-300 [html[data-theme=dark]_&]:border-gray-700 border-dashed"></div>
      </div>
    </>
  );
};
