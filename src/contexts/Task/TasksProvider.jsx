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

  // const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) =>
    toast.success(message, {
      duration: 3000,
      style: { width: "fit-content", maxWidth: "800px" },
    });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { selectedList } = useFolders();

  const [selectedTask, setSelectedTask] = useState(null);

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

  const updateTaskbyId = async (task) => {
    try {
      if (!token) {
        console.error("Token no encontrado");
        navigate("/auth");
      }

      setIsLoading(true);

      const response = await updateTask(
        task.id,
        task.title,
        task.description,
        task.priority,
        task.completed,
        token
      );
      if (!response.error) {
        notifySuccess(
          <span>
            Tarea<strong> {task.title} </strong> actualizada correctamente
          </span>
        );
        await getTasksByList();
      }
    } catch (err) {
      console.error("Error al actualizar la tarea:", err.message);
    } finally {
      setIsLoading(false);
      document.getElementById("task-info-modal").close();
    }
  };

  const updateSelectedTask = (task) => {
    setSelectedTask(task);
    document.getElementById("task-info-modal").showModal();
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
