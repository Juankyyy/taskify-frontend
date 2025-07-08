import { Sidebar } from "../components/Sidebar/Sidebar";
import { TasksProvider } from "../contexts/Task/TasksProvider";

export const MainLayout = ({ children }) => {
  return (
    <TasksProvider>
      <div className="flex h-[calc(100dvh-20px)] flex-col-reverse sm:h-[unset] sm:flex-row gap-2.5 m-2.5">
        <Sidebar />
        {children}
      </div>
    </TasksProvider>
  );
};
