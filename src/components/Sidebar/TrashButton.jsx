import { Trash2 } from "lucide-react";
import { useTasks } from "../../hooks/useTasks";
import { Navigate, useLocation } from "react-router-dom";

export const TrashButton = () => {
  const { unSelectList } = useTasks();

  const location = useLocation();

  const isTrashView = location.pathname === "/trash";

    const onClickTrash = async () => {
    unSelectList();
    Navigate("/trash");
  };

  return (
    <div
      onClick={onClickTrash}
      className={`flex items-center cursor-pointer group gap-2 p-2 px-3 bg-base-300/50 hover:bg-base-300 [html[data-theme=light]_&]:border-slate-300 [html[data-theme=light]_&]:hover:border-slate-500 border-transparent border rounded-lg transition-border-color-bg ${
        isTrashView &&
        "bg-base-300! [html[data-theme=light]_&]:border-slate-500"
      }`}
    >
      <Trash2 className="w-icon h-icon" />
      <h1 className={`${isTrashView && "font-bold"} transition-text-weight`}>
        Papelera
      </h1>
    </div>
  );
};
