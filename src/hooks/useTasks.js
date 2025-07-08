import { useContext } from "react";
import { TasksContext } from "../contexts/Task/TasksContext";

export const useTasks = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }

  return context;
};
