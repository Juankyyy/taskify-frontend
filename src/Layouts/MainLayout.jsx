import { Sidebar } from "../components/Sidebar/Sidebar";

export const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col-reverse sm:flex-row gap-2.5 m-2.5">
      <Sidebar />
      {children}
    </div>
  );
};
