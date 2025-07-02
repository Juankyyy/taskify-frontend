export const Dropdown = ({ icon, children }) => {
  return (
    <div className="dropdown sm:dropdown-top dropdown-left dropdown-end">
      <div tabIndex={0} role="button">
        {icon}
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
