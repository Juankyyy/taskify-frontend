import { TasksContext } from "./TasksContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  completeTask,
  getTasks,
  createTask,
  archiveTask,
  getTrash,
  emptyTrash,
  restoreTask,
  deleteTask,
} from "../../services/task";
import toast from "react-hot-toast";

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) =>
    toast.success(message, {
      duration: 3000,
      style: { width: "fit-content", maxWidth: "800px" },
    });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [selectedList, setSelectedList] = useState(
    JSON.parse(sessionStorage.getItem("selectedList"))
  );

  const [selectedFolderId, setSelectedFolderId] = useState(
    JSON.parse(sessionStorage.getItem("selectedFolder"))
  );

  const [selectedTask, setSelectedTask] = useState({});

  const [deletedTasks, setDeletedTasks] = useState([]);

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
        notifySuccess(
          <span>
            Tarea<strong> {title} </strong> creada correctamente
          </span>
        );
        await getTasksByList();
        document.getElementById("create-task-modal").close();
      }
    } catch (err) {
      console.error("Error al crear la tarea:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const archiveTaskbyId = async (task) => {
    try {
      if (!token) {
        console.error("Token no encontrado");
        navigate("/auth");
      }

      setIsLoading(true);

      const response = await archiveTask(task._id, token);
      if (!response.error) {
        notifySuccess(
          <span>
            Tarea<strong> {task.title} </strong> enviada a la papelera
          </span>
        );
        await getTasksByList();
      }
    } catch (err) {
      console.error("Error al completar la tarea:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getTrashTasks = async () => {
    try {
      if (!token) {
        console.error("Token no encontrado");
        navigate("/auth");
      }

      setIsLoading(true);

      const response = await getTrash(token);
      if (!response.error) {
        setDeletedTasks(response);
      }
    } catch (err) {
      console.error("Error al cargar las tareas:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const emptyTrashTasks = async () => {
    try {
      if (!token) {
        console.error("Token no encontrado");
        navigate("/auth");
      }

      setIsLoading(true);

      const response = await emptyTrash(token);
      if (!response.error) {
        notifySuccess("Todas las tareas se han eliminado permanentemente");
        await getTrashTasks();
      }
    } catch (err) {
      console.error("Error al vaciar la papelera:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const restoreTaskbyId = async (task) => {
    try {
      if (!token) {
        console.error("Token no encontrado");
        navigate("/auth");
      }

      setIsLoading(true);

      const response = await restoreTask(task._id, token);
      if (!response.error) {
        notifySuccess(
          <span>
            Tarea<strong> {task.title} </strong> restaurada correctamente
          </span>
        );
        await getTrashTasks();
      }
    } catch (err) {
      console.error("Error al restaurar la tarea:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTaskbyId = async (task) => {
    try {
      if (!token) {
        console.error("Token no encontrado");
        navigate("/auth");
      }

      setIsLoading(true);

      const response = await deleteTask(task._id, token);
      if (!response.error) {
        notifySuccess(
          <span>
            Tarea<strong> {task.title} </strong> eliminada permanentemente
          </span>
        );
        await getTrashTasks();
      }
    } catch (err) {
      console.error("Error al eliminar la tarea:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSelectedList = (list, folder) => {
    setSelectedList(list);
    sessionStorage.setItem("selectedList", JSON.stringify(list));

    setSelectedFolderId(folder);
    sessionStorage.setItem("selectedFolder", JSON.stringify(folder));

    navigate("/tasks");
  };

  const updateSelectedTask = (task) => {
    setSelectedTask(task);
    document.getElementById("task-info-modal").showModal();
  };

  const unSelectList = () => {
    navigate("/");
    setSelectedList(null);
    setSelectedFolderId(null);
    sessionStorage.removeItem("selectedList");
    sessionStorage.removeItem("selectedFolder");
  };

  const onClickTrash = async () => {
    unSelectList();
    navigate("/trash");
  };

  useEffect(() => {
    if (selectedList) {
      getTasksByList();
    }
  }, [selectedList]);

  const value = {
    tasks,
    deletedTasks,
    isLoading,
    selectedList,
    selectedTask,
    selectedFolderId,
    unSelectList,
    completeTaskbyId,
    createTaskbyId,
    archiveTaskbyId,
    updateSelectedTask,
    updateSelectedList,
    onClickTrash,
    getTrashTasks,
    emptyTrashTasks,
    restoreTaskbyId,
    deleteTaskbyId,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
