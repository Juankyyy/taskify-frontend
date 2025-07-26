import { Sidebar } from "../components/Sidebar/Sidebar";

export const MainLayout = ({ children }) => {
  return (
    <div className="flex h-dvh flex-col-reverse sm:h-[unset] sm:flex-row gap-2.5 sm:m-2.5 m-2.5 mt-0 mb-0">
      <Sidebar />
      {children}
    </div>
  );
};
