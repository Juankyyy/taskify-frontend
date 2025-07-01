import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFolders, getLists, deleteFolder } from "../services/folder";
import { useEffect } from "react";

export const useFolders = () => {
  const [folders, setFolders] = useState([]);
  const [lists, setLists] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [selectedFolder, setSelectedFolder] = useState({});

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

  // Función para recargar las carpetas y listas
  // Si se recarga, se borran los estados de las carpetas y listas
  // const refetchFolders = async () => {
  //   try {
  //     if (!token) {
  //       console.error("Token no encontrado");
  //       navigate("/auth");
  //     }

  //     setIsLoading(true);
  //     const foldersData = await getFolders(token);
  //     const allLists = await getLists(foldersData, token);

  //     setFolders(foldersData);
  //     setLists(allLists);
  //   } catch (err) {
  //     setError(err.message);
  //     console.error("Error al recargar las carpetas:", err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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

  useEffect(() => {
    getFoldersAndLists();
  }, []);

  return {
    folders,
    lists,
    selectedFolder,
    onDeleteClick,
    handleDeleteFolder,
    isLoading,
    error,
  };
};
