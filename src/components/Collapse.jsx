import { ChevronDown } from "lucide-react";
import { FolderActions } from "./Sidebar/FolderActions";
import { useTasks } from "../hooks/useTasks";
import { useState } from "react";

export const Collapse = ({
  title,
  folderId,
  children,
  selectFolder,
  selectedFolderTitle,
  handleCreateList,
  defaultOpen = false,
}) => {
  const { updateSelectedFolder } = useTasks();

  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleClick = () => {
    setIsOpen(!isOpen);
    updateSelectedFolder(folderId);
  };

  return (
    <div className={`flex justify-between bg-base-100 hover:border-slate-500 ${isOpen && "border-slate-500!"} border border-transparent px-2 rounded-lg transition-border-color`}>
      <div className="collapse group w-3/4!">
        <input
          className="p-0"
          type="checkbox"
          defaultChecked={defaultOpen}
          onClick={handleClick}
        />
        <div className="collapse-title flex items-center justify-between p-0">
          <div className="flex items-center">
            <ChevronDown className="w-icon h-icon stroke-3 mr-1 transform duration-300 group-has-[:checked]:rotate-180 " />
            <p className="font-medium truncate max-w-[153px]">{title}</p>
          </div>
        </div>
        <div className="collapse-content pl-[35px] flex flex-col gap-1">
          {children}
        </div>
      </div>

      <FolderActions
        title={title}
        folderId={folderId}
        selectFolder={selectFolder}
        handleCreateList={handleCreateList}
        selectedFolderTitle={selectedFolderTitle}
      />
    </div>
  );
};
