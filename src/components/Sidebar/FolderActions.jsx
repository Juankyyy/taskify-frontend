import { Trash } from "lucide-react";
import { Plus } from "lucide-react";
import { Tooltip } from "../Tooltip";

export const FolderActions = () => {
  // 🧠 Logic

  return (
    <div className="flex justify-center items-center gap-2 z-20 overflow-visible">
      <Tooltip title={"Nueva lista"}>
        <Plus className="w-7 h-7 p-1 stroke-3 stroke-slate-400 cursor-pointer rounded-full transition-colors hover:bg-green-600 hover:stroke-white hover:animate-pop hover:animate-duration-500" />
      </Tooltip>

      <Tooltip title={"Eliminar lista"}>
        <Trash className="w-icon h-7 stroke-3 stroke-slate-400 cursor-pointer hover:animate-tada  hover:stroke-red-600" />
      </Tooltip>
    </div>
  );
};
