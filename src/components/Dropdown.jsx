import { EllipsisVertical } from "lucide-react";

export const Dropdown = ({ children }) => {
  return (
    <div className="dropdown sm:dropdown-start dropdown-top dropdown-end z-[999]">
      <div tabIndex={0} role="button">
        <EllipsisVertical className="cursor-pointer w-icon h-icon" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-200 border border-slate-300 [html[data-theme=dark]_&]:border-slate-700 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        {children}
      </ul>
    </div>
  );
};
