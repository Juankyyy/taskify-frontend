import { Sidebar } from "../components/Sidebar/Sidebar";

export const MainLayout = ({ children }) => {
  return (
    <main className="flex gap-2.5">
      <Sidebar />
      {children}
    </main>
  );
};
