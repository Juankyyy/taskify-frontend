export const Dropdown = ({ icon, children }) => {
  return (
    <div className="dropdown dropdown-top">
      <div tabIndex={0} role="button">
        {icon}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        {children}
      </ul>
    </div>
  );
};
