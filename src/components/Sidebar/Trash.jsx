import { Trash2 } from "lucide-react";
import { useTasks } from "../../hooks/useTasks";
import { useLocation } from "react-router-dom";

export const Trash = () => {
  const { onClickTrash } = useTasks();

  const location = useLocation();

  const isTrashView = location.pathname === "/trash";

  return (
    <div
      onClick={onClickTrash}
      className={`flex items-center cursor-pointer group gap-2 p-2 bg-base-100 [html[data-theme=light]_&]:border-slate-300 border-transparent hover:border-slate-500! border rounded-lg transition-border-color ${
        isTrashView && "border-slate-500! bg-base-200!"
      }`}
    >
      <Trash2 className="w-icon h-icon" />
      <h1>Papelera</h1>
    </div>
  );
};
