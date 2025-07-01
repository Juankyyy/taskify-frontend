import { ChevronDown } from "lucide-react";
import { FolderActions } from "./Sidebar/FolderActions";

export const Collapse = ({ title, folderId, children, onDeleteClick }) => {
  return (
    <div className="flex items-baseline justify-between">
      <div className="collapse group w-3/4!">
        <input className="p-0" type="checkbox" />
        <div className="collapse-title flex items-center justify-between p-0">
          <div className="flex items-center">
            <ChevronDown className="w-icon h-icon stroke-3 mr-1 transform duration-300 group-has-[:checked]:rotate-180 " />
            <p className="font-medium">{title}</p>
          </div>
        </div>
        <div className="collapse-content">{children}</div>
      </div>

      <FolderActions title={title} folderId={folderId} onDeleteClick={onDeleteClick} />
    </div>
  );
};
