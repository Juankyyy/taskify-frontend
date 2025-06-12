import { Sidebar } from "../components/Sidebar/Sidebar";

export const MainLayout = ({ children }) => {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
};
