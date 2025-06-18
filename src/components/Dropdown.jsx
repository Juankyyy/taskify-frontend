export const Dropdown = ({ icon, direction, children }) => {
  return (
    <div className={`dropdown dropdown-${direction}`}>
      <div tabIndex={0} role="button">
        {icon}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-content rounded-box z-1 w-52 p-2 shadow-sm"
      >
        {children}
      </ul>
    </div>
  );
};
