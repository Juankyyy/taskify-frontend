export const Tooltip = ({ title, children }) => {
  return (
    <div className="md:tooltip" data-tip={title}>
      {children}
    </div>
  );
};