import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FolderActions } from "./Sidebar/FolderActions";

export const Collapse = ({
  title,
  folderId,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex justify-between bg-base-200/50 [html[data-theme=light]_&]:bg-base-300 [html[data-theme=dark]_&]:hover:bg-base-200 [html[data-theme=light]_&]:hover:border-slate-500 [html[data-theme=light]_&]:border-slate-300  ${
        isOpen &&
        "[html[data-theme=dark]_&]:bg-base-200! [html[data-theme=light]_&]:border-slate-500"
      } border border-transparent px-2 rounded-lg transition-border-color-bg`}
    >
      <div className="collapse group w-3/4!">
        <input
          className="p-0"
          type="checkbox"
          defaultChecked={defaultOpen}
          onClick={toggleFolder}
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

      <FolderActions title={title} folderId={folderId} />
    </div>
  );
};
