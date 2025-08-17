import { TasksContext } from "./TasksContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFolders } from "../../hooks/useFolders";
import {
  completeTask,
  getTasks,
  createTask,
  archiveTask,
  getTrash,
  emptyTrash,
  restoreTask,
  deleteTask,
  updateTask,
} from "../../services/task";

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [deletedTasks, setDeletedTasks] = useState([]);

  const navigate = useNavigate();
  const { selectedList } = useFolders();

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) =>
    toast.success(message, {
      duration: 3000,
      style: { width: "fit-content", maxWidth: "800px" },
    });

  const handleUnauthorized = (err) => {
    if (err?.response?.status === 401) {
      navigate("/auth");
    }
  };

  const getTasksByList = async () => {
    try {
      setIsLoading(true);
      const response = await getTasks(selectedList._id);

      if (!response.error) {
        setTasks(response);
      } else {
        notifyError(response.message);
      }

      if (selectedTask) {
        const updated = response.find(
          (task) => task._id === selectedTask._id
        );
        return updated;
      }
    } catch (err) {
      console.error("Error al cargar tareas:", err.message);
      handleUnauthorized(err);
    } finally {
      setIsLoading(false);
    }
  };

  const completeTaskbyId = async (taskId) => {
    try {
      const response = await completeTask(taskId);
      if (!response.error) {
        notifySuccess(response);
      }
    } catch (err) {
      handleUnauthorized(err);
      notifyError("Error al completar la tarea");
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
      setIsLoading(true);
      const response = await createTask(
        title,
        description,
        priority,
        listId,
        folderId
      );
      if (!response.error) {
        notifySuccess(
          <span>
            Tarea<strong> {title} </strong> creada correctamente
          </span>
        );
        await getTasksByList();
        document.getElementById("create-task-modal")?.close();
      } else {
        notifyError(response.message);
      }
    } catch (err) {
      handleUnauthorized(err);
      console.error("Error al crear la tarea:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const archiveTaskbyId = async (task) => {
    try {
      const response = await archiveTask(task._id);
      if (!response.error) {
        notifySuccess(
          <span>
            Tarea<strong> {task.title} </strong> enviada a la papelera
          </span>
        );
      } else {
        notifyError(response.message);
      }
    } catch (err) {
      handleUnauthorized(err);
      notifyError("Error al archivar la tarea");
    }
  };

  const getTrashTasks = async () => {
    try {
      setIsLoading(true);
      const response = await getTrash();
      if (!response.error) {
        setDeletedTasks(response);
      } else {
        notifyError(response.message);
      }
    } catch (err) {
      handleUnauthorized(err);
      console.error("Error al cargar la papelera:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const emptyTrashTasks = async () => {
    try {
      setIsLoading(true);
      const response = await emptyTrash();

      if (!response.error) {
        notifySuccess("Todas las tareas se han eliminado permanentemente");
        await getTrashTasks();
      } else {
        notifyError(response.message);
      }

    } catch (err) {
      handleUnauthorized(err);
      console.error("Error al vaciar la papelera:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const restoreTaskbyId = async (task) => {
    try {
      const response = await restoreTask(task._id);
      if (!response.error) {
        notifySuccess(
          <span>
            Tarea<strong> {task.title} </strong> restaurada correctamente
          </span>
        );
      } else {
        notifyError(response.message);
      }
    } catch (err) {
      handleUnauthorized(err);
      notifyError("Error al restaurar la tarea");
    }
  };

  const deleteTaskbyId = async (task) => {
    try {
      const response = await deleteTask(task._id);
      if (!response.error) {
        notifySuccess(
          <span>
            Tarea<strong> {task.title} </strong> eliminada permanentemente
          </span>
        );
      } else {
        notifyError(response.message);
      }
    } catch (err) {
      handleUnauthorized(err);
      notifyError("Error al eliminar la tarea");
    }
  };

  const updateTaskbyId = async (task) => {
    try {
      setIsLoading(true);
      const response = await updateTask(
        task.id,
        task.title,
        task.description,
        task.priority,
        task.completed
      );
      if (!response.error) {
        notifySuccess(
          <span>
            Tarea<strong> {task.title} </strong> actualizada correctamente
          </span>
        );
        await getTasksByList();
      } else {
        notifyError(response.message);
      }
    } catch (err) {
      handleUnauthorized(err);
      console.error("Error al actualizar la tarea:", err.message);
    } finally {
      setIsLoading(false);
      document.getElementById("task-info-modal")?.close();
    }
  };

  const updateSelectedTask = (task) => {
    setSelectedTask(task);
    document.getElementById("task-info-modal")?.showModal();
  };

  const value = {
    isLoading,
    getTasksByList,
    tasks,
    selectedTask,
    completeTaskbyId,
    createTaskbyId,
    archiveTaskbyId,
    updateSelectedTask,
    deletedTasks,
    getTrashTasks,
    emptyTrashTasks,
    restoreTaskbyId,
    deleteTaskbyId,
    updateTaskbyId,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
