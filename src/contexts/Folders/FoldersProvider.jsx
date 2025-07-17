import { FoldersContext } from "./FoldersContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Folder } from "lucide-react";
import {
  getFolders,
  getLists,
  deleteFolder,
  createFolder,
  createList,
  deleteList,
} from "../../services/folder";
import toast from "react-hot-toast";

export const FoldersProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState({});

  const notifyError = (message) => toast.error(message);
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
      console.error("Error al cargar las carpetas:", err.message);
    } finally {
      setIsLoading(false);
    }
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
        notifySuccess(
          <span>
            Carpeta<strong> {selectedFolder.title} </strong>eliminada
          </span>
        );
        await getFoldersAndLists();
      } else {
        notifyError(response.message);
      }
    } catch (err) {
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
      if (!response.error) {
        notifySuccess(
          <span>
            Carpeta<strong> {folderName} </strong>creada
          </span>
        );
        await getFoldersAndLists();
      } else {
        notifyError(response.message);
      }
    } catch (err) {
      console.error("Error al crear la carpeta:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateList = async (listName) => {
    try {
      if (!token) {
        console.error("Token no encontrado");
        navigate("/auth");
      }

      setIsLoading(true);

      const response = await createList(
        listName,
        selectedFolder.folderId,
        token
      );
      if (!response.error) {
        notifySuccess(
          <span className="flex gap-2 items-center">
            Lista<strong> {listName} </strong>creada en
            <div className="flex gap-1 items-center">
              <Folder className="w-4 h-4 stroke-gray-600" />
              <strong>{selectedFolder.title}</strong>
            </div>
          </span>
        );
        await getFoldersAndLists();
      } else {
        notifyError(response.message);
      }
    } catch (err) {
      console.error("Error al crear la lista:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteListById = async () => {
    try {
      if (!token) {
        console.error("Token no encontrado");
        navigate("/auth");
      }

      setIsLoading(true);

      const response = await deleteList(selectedList._id, token);
      if (!response.error) {
        notifySuccess(
          <span>
            Lista<strong> {selectedList.title} </strong>eliminada correctamente
          </span>
        );

        await getFoldersAndLists();
        navigate("/");
      } else {
        notifyError(response.message);
      }
    } catch (err) {
      console.error("Error al eliminar la lista:", err.message);
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

  const selectFolder = (title = null, folderId) => {
    setSelectedFolder({ title, folderId });
  };

  const unSelectList = () => {
    setSelectedList(null);
    setSelectedFolderId(null);
    sessionStorage.removeItem("selectedList");
    sessionStorage.removeItem("selectedFolder");
  };

  const value = {
    getFoldersAndLists,
    folders,
    lists,
    selectedList,
    selectFolder,
    selectedFolder,
    selectedFolderId,
    updateSelectedList,
    handleDeleteFolder,
    handleCreateFolder,
    handleCreateList,
    deleteListById,
    unSelectList,
    isLoading,
  };

  return (
    <FoldersContext.Provider value={value}>{children}</FoldersContext.Provider>
  );
};
