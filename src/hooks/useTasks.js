import { useState } from "react";
import { getTasks } from "../services/task";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // const selectListId= localStorage.getItem("selectedList");
  const [selectListId, setselectListId] = useState(localStorage.getItem("selectedList"))
  
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

  useEffect(() => {
    getTasksByList();
  }, [selectListId]);

  return {
    tasks,
    isLoading,
    selectListId
  };
};
