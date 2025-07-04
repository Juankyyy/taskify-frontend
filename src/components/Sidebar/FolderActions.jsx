import { Trash } from "lucide-react";
import { Plus } from "lucide-react";
import { Tooltip } from "../Tooltip";
import { CreateFolder } from "../Modals/CreateFolder";

export const FolderActions = ({
  title,
  folderId,
  selectFolder,
  handleCreateList,
}) => {
  const initialForm = {
    title: "",
    folderId: folderId,
  };

  const handleCreateClick = () => {
    selectFolder(title, folderId);
    document.getElementById("create-list-modal").showModal();
  };

  const handleDeleteClick = () => {
    selectFolder(title, folderId);
    document.getElementById("delete-folder-modal").showModal();
  };

  return (
    <div className="flex justify-center items-center gap-2 z-20 overflow-visible h-min mt-[2px]">
      <Tooltip title={"Nueva lista"}>
        <Plus onClick={handleCreateClick} className="w-7 h-7 p-1 stroke-3 stroke-slate-400 cursor-pointer rounded-full transition-colors hover:bg-green-600 hover:stroke-white hover:animate-pop hover:animate-duration-500" />
      </Tooltip>

      <Tooltip title={"Eliminar lista"}>
        <Trash
          onClick={handleDeleteClick}
          className="w-icon h-7 stroke-3 stroke-slate-400 cursor-pointer hover:animate-tada  hover:stroke-red-600"
        />
      </Tooltip>

      <CreateFolder
        type="list"
        handleCreate={handleCreateList}
        initialForm={initialForm}
      />
    </div>
  );
};
