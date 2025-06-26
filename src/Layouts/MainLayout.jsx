import { Sidebar } from "../components/Sidebar/Sidebar";

export const MainLayout = ({ children }) => {
  return (
    <div className="flex gap-2.5 m-2.5">
      <Sidebar />
      {children}
    </div>
  );
};
