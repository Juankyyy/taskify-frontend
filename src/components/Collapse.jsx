import { Trash } from "lucide-react";
import { Plus } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Tooltip } from "./Tooltip";

export const Collapse = ({ title, children }) => {
  return (
    <div className="collapse group overflow-visible">
      <input className="p-0" type="checkbox" />
      <div className="collapse-title flex items-center justify-between p-0">
        <div className="flex items-center">
          <ChevronDown className="w-icon h-icon stroke-3 mr-1 transform duration-300 group-has-[:checked]:rotate-180 " />
          <p className="font-medium">{title}</p>
        </div>

        <div className="flex justify-center items-center gap-2 z-20">
          <Tooltip title={"Nueva lista"}>
            <Plus className="w-7 h-7 p-1 stroke-3 stroke-slate-500 cursor-pointer rounded-full transition-colors hover:bg-green-600 hover:stroke-white hover:animate-pop hover:animate-duration-500" />
          </Tooltip>
          
          <Tooltip title={"Eliminar lista"}>
            <Trash className="w-icon h-icon stroke-3 stroke-slate-500 cursor-pointer hover:animate-tada  hover:stroke-red-600 transition-all" />
          </Tooltip>
        </div>
      </div>
      <div className="collapse-content">{children}</div>
    </div>
  );
};
