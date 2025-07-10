import { TasksContext } from "./TasksContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { completeTask, getTasks } from "../../services/task";
import toast from "react-hot-toast";

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [selectedList, setSelectedList] = useState(
    JSON.parse(sessionStorage.getItem("selectedList"))
  );

  const [selectedTask, setSelectedTask] = useState({});

  const getTasksByList = async () => {
    try {
      if (!token) {
        console.error("Token no encontrado");
        navigate("/auth");
      }

      setIsLoading(true);

      const taskData = await getTasks(selectedList._id, token);
      if (!taskData.error) {
        setTasks(taskData);
      }
      if (selectedTask) {
        const TaskUpdated = taskData.find(
          (task) => task._id == selectedTask._id
        );
        return TaskUpdated;
      }
    } catch (err) {
      console.error("Error al cargar las tareas:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const completeTaskbyId = async (taskId) => {
    try {
      if (!token) {
        console.error("Token no encontrado");
        navigate("/auth");
      }

      setIsLoading(true);

      const taskData = await completeTask(taskId, token);
      if (!taskData.error) {
        notifySuccess(taskData);

        if (selectedTask) {
          const TaskUpdated = await getTasksByList();
          setSelectedTask(TaskUpdated);
        } else {
          await getTasksByList();
        }
      }
    } catch (err) {
      console.error("Error al completar la tarea:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSelectedList = (list) => {
    setSelectedList(list);
    sessionStorage.setItem("selectedList", JSON.stringify(list));
  };

  const updateSelectedTask = (task) => {
    setSelectedTask(task);
    document.getElementById("task-info-modal").showModal();
  };

  const unSelectList = () => {
    setSelectedList(null);
    sessionStorage.removeItem("selectedList");
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
    selectedTask,
    unSelectList,
    completeTaskbyId,
    updateSelectedTask,
    updateSelectedList,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
