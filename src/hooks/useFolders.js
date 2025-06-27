import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFolders, getLists } from "../services/folder";
import { useEffect } from "react";

export const useFolders = () => {
  const [folders, setFolders] = useState([]);
  const [lists, setLists] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Función para recargar las carpetas y listas
  // Si se recarga, se borran los estados de las carpetas y listas
  const refetchFolders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token no encontrado");
        navigate("/auth");
      }

      const foldersData = await getFolders(token);
      const allLists = await getLists(foldersData.data, token);

      setFolders(foldersData.data);
      setLists(allLists);
    } catch (err) {
      console.error("Error al recargar las carpetas:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchFoldersAndLists = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token no encontrado");
          navigate("/auth");
        }

        const foldersData = await getFolders(token);
        const allLists = await getLists(foldersData.data, token);

        setFolders(foldersData.data);
        setLists(allLists);
      } catch (err) {
        setError(err.message);
        console.error("Error al cargar las carpetas:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoldersAndLists();
  }, []);

  return {
    folders,
    lists,
    refetchFolders,
    isLoading,
    error,
  };
};
