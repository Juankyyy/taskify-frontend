import { TasksContext } from "./TasksContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { completeTask, getTasks, createTask } from "../../services/task";
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

  const [selectedFolderId, setSelectedFolderId] = useState(
    JSON.parse(sessionStorage.getItem("selectedFolder"))
  );

  const [selectedTask, setSelectedTask] = useState({});

  const getTasksByList = async () => {
    try {
      if (!token) {
        console.error("Token no encontrado");
        navigate("/auth");
      }

      setIsLoading(true);

      const response = await getTasks(selectedList._id, token);
      if (!response.error) {
        setTasks(response);
      }
      if (selectedTask) {
        const TaskUpdated = response.find(
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

      const response = await completeTask(taskId, token);
      if (!response.error) {
        notifySuccess(response);

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

  const createTaskbyId = async (
    title,
    description,
    priority,
    listId,
    folderId
  ) => {
    try {
      if (!token) {
        console.error("Token no encontrado");
        navigate("/auth");
      }

      setIsLoading(true);

      const response = await createTask(
        title,
        description,
        priority,
        listId,
        folderId,
        token
      );
      if (!response.error) {
        notifySuccess(response.message);
        document.getElementById("create-task-modal").close();
        await getTasksByList();
      }
    } catch (err) {
      console.error("Error al crear la tarea:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSelectedList = (list, folder = null) => {
    setSelectedList(list);
    sessionStorage.setItem("selectedList", JSON.stringify(list));

    if (folder) {
      setSelectedFolderId(folder);
      sessionStorage.setItem("selectedFolder", JSON.stringify(folder));
    }
  };

  const updateSelectedFolder = (folder) => {
    setSelectedFolderId(folder);
    sessionStorage.setItem("selectedFolder", JSON.stringify(folder));
  };

  const updateSelectedTask = (task) => {
    setSelectedTask(task);
    document.getElementById("task-info-modal").showModal();
  };

  const unSelectList = () => {
    setSelectedList(null);
    setSelectedFolderId(null);
    sessionStorage.removeItem("selectedList");
    sessionStorage.removeItem("selectedFolder");
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
    selectedFolderId,
    unSelectList,
    completeTaskbyId,
    createTaskbyId,
    updateSelectedTask,
    updateSelectedList,
    updateSelectedFolder,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
