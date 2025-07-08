import { TasksContext } from "./TasksContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getTasks } from "../../services/task";

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [selectedList, setSelectedList] = useState(
    JSON.parse(sessionStorage.getItem("selectedList"))
  );

  const getTasksByList = async () => {
    try {
      if (!token) {
        console.error("Token no encontrado");
        navigate("/auth");
      }

      setIsLoading(true);

      const taskData = await getTasks(selectedList._id, token);
      setTasks(taskData);
    } catch (err) {
      console.error("Error al cargar las tareas:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSelectedList = (list) => {
    setSelectedList(list);
    sessionStorage.setItem("selectedList", JSON.stringify(list));
  };

  useEffect(() => {
    if (selectedList) {
      getTasksByList();
    }
  }, [selectedList]);

  const value = {
    tasks,
    isLoading,
    selectedList,
    updateSelectedList,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
