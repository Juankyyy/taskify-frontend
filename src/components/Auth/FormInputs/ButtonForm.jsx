export const ButtonForm = ({ children }) => {
  return (
    <button type="submit" className="animate-fade-in-up btn btn-wide btn-success rounded-full">
      {children}
    </button>
  );
};
