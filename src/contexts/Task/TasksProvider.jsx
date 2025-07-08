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
  const [selectListId, setSelectListId] = useState(
    localStorage.getItem("selectedList")
  );

  const getTasksByList = async () => {
    try {
      if (!token) {
        console.error("Token no encontrado");
        navigate("/auth");
      }

      setIsLoading(true);

      console.log(selectListId);
      const taskData = await getTasks(selectListId, token);
      console.log(selectListId);
      setTasks(taskData);
    } catch (err) {
      console.error("Error al cargar las tareas:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSelectedList = (listId) => {
    setSelectListId(listId);
    console.log(listId)
    localStorage.setItem("selectedList", listId);
  };

  useEffect(() => {
    getTasksByList();
  }, [selectListId]);

  const value = {
    tasks,
    isLoading,
    selectListId,
    updateSelectedList,
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};
