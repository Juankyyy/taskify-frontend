import { useLocation, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useFolders } from "../../hooks/useFolders";

export const TrashButton = () => {
  const { unSelectList } = useFolders();

  const navigate = useNavigate();
  const location = useLocation();
  const isTrashView = location.pathname === "/trash";

  const onClickTrash = () => {
    unSelectList();
    navigate("/trash");
  };

  return (
    <div
      onClick={onClickTrash}
      className={`flex items-center cursor-pointer mt-2 group gap-2 sm:p-2 p-1 px-3 bg-base-300/50 hover:bg-base-300 [html[data-theme=light]_&]:border-slate-300 [html[data-theme=light]_&]:hover:border-slate-500 border-transparent border rounded-lg transition-border-color-bg ${
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
