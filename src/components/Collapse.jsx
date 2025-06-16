import { Trash } from "lucide-react";
import { Plus } from "lucide-react";
import { ChevronDown } from "lucide-react";

export const Collapse = ({ title, children }) => {
  return (
    <div className="collapse group">
      <input className="p-0" type="checkbox" />
      <div className="collapse-title flex items-center justify-between p-0">
        <div className="flex items-center">
          <ChevronDown className="w-4 h-4 stroke-3 transform duration-300 group-has-[:checked]:rotate-180 " />
          {title}
        </div>

        <div className="flex gap-2 z-20">
          <Plus className="w-4 h-4 stroke-3 stroke-slate-500 cursor-pointer hover:animate-squeeze" />
          <Trash className="w-4 h-4 stroke-3 stroke-slate-500 cursor-pointer hover:animate-tada  hover:stroke-red-600 transition-all" />
        </div>
      </div>
      <div className="collapse-content">{children}</div>
    </div>
  );
};
