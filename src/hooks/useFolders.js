import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFolders,
  getLists,
  deleteFolder,
  createFolder,
} from "../services/folder";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useFolders = () => {
  const [folders, setFolders] = useState([]);
  const [lists, setLists] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const [selectedFolder, setSelectedFolder] = useState({});

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getFoldersAndLists = async () => {
    try {
      if (!token) {
        console.error("Token no encontrado");
        navigate("/auth");
      }

      setIsLoading(true);
      const foldersData = await getFolders(token);
      const allLists = await getLists(foldersData, token);

      setFolders(foldersData);
      setLists(allLists);
    } catch (err) {
      setError(err.message);
      console.error("Error al cargar las carpetas:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteClick = (title, folderId) => {
    setSelectedFolder({ title, folderId });
    document.getElementById("delete-folder-modal").showModal();
  };

  const handleDeleteFolder = async () => {
    try {
      if (!token) {
        console.error("Token no encontrado");
        navigate("/auth");
      }

      setIsLoading(true);

      const response = await deleteFolder(selectedFolder.folderId, token);
      if (response.ok) {
        setMessage(response.message);
        await getFoldersAndLists();
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error al eliminar la carpeta:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateFolder = async (folderName) => {
    try {
      if (!token) {
        console.error("Token no encontrado");
        navigate("/auth");
      }

      setIsLoading(true);

      const response = await createFolder(folderName, token);
      if (response.ok) {
        setMessage(response.message);
        await getFoldersAndLists();
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error al crear la carpeta:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFoldersAndLists();
  }, []);

  useEffect(() => {
    if (error) {
      notifyError(error);
    }
    if (message) {
      notifySuccess(message);
    }
  }, [error, message]);

  return {
    folders,
    lists,
    selectedFolder,
    onDeleteClick,
    handleDeleteFolder,
    handleCreateFolder,
    isLoading,
    error,
  };
};
