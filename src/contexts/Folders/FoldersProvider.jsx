import { FoldersContext } from "./FoldersContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Folder } from "lucide-react";
import toast from "react-hot-toast";
import {
  getFolders,
  getLists,
  deleteFolder,
  createFolder,
  createList,
  deleteList,
} from "../../services/folder";

export const FoldersProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) =>
    toast.success(message, {
      duration: 3000,
      style: { width: "fit-content", maxWidth: "800px" },
    });

  const navigate = useNavigate();

  const [selectedList, setSelectedList] = useState(
    JSON.parse(sessionStorage.getItem("selectedList"))
  );

  const [modalSelectedFolder, setModalSelectedFolder] = useState({});

  const [selectedFolder, setSelectedFolder] = useState(
    JSON.parse(sessionStorage.getItem("selectedFolder"))
  );

  const getFoldersAndLists = async () => {
    try {
      setIsLoading(true);

      const foldersData = await getFolders();
      const allLists = await getLists(foldersData);

      setFolders(foldersData);
      setLists(allLists);
    } catch (err) {
      if (err.message === "Unauthorized") {
        navigate("/auth");
      }
      console.error("Error al cargar las carpetas:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFolder = async () => {
    try {
      setIsLoading(true);

      const response = await deleteFolder(modalSelectedFolder.folderId);
      if (response.ok) {
        notifySuccess(
          <span>
            Carpeta<strong> {modalSelectedFolder.title} </strong>eliminada
          </span>
        );

        await getFoldersAndLists();
        navigate("/");
      } else {
        notifyError(response.message);
      }
    } catch (err) {
      if (err.message === "Unauthorized") {
        navigate("/auth");
      }
      console.error("Error al eliminar la carpeta:", err.message);
    } finally {
      setIsLoading(false);
      document.getElementById("delete-folder-modal").close();
    }
  };

  const handleCreateFolder = async (folderName) => {
    try {
      setIsCreating(true);

      const response = await createFolder(folderName);
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
      if (err.message === "Unauthorized") {
        navigate("/auth");
      }
      console.error("Error al crear la carpeta:", err.message);
    } finally {
      setIsCreating(false);
      document.getElementById("create-folder-modal").close();
    }
  };

  const handleCreateList = async (listName) => {
    try {
      setIsCreating(true);

      const response = await createList(listName, modalSelectedFolder.folderId);
      if (!response.error) {
        notifySuccess(
          <span className="flex gap-2 items-center">
            Lista<strong> {listName} </strong>creada en
            <div className="flex gap-1 items-center">
              <Folder className="w-4 h-4 stroke-gray-600" />
              <strong>{modalSelectedFolder.title}</strong>
            </div>
          </span>
        );
        await getFoldersAndLists();
      } else {
        notifyError(response.message);
      }
    } catch (err) {
      if (err.message === "Unauthorized") {
        navigate("/auth");
      }
      console.error("Error al crear la lista:", err.message);
    } finally {
      setIsCreating(false);
      document.getElementById("create-list-modal").close();
    }
  };

  const deleteListById = async () => {
    try {
      setIsLoading(true);

      const response = await deleteList(selectedList._id);
      if (!response.error) {
        notifySuccess(
          <span>
            Lista<strong> {selectedList.title} </strong>eliminada correctamente
          </span>
        );

        navigate("/");
        await getFoldersAndLists();
      } else {
        notifyError(response.message);
      }
    } catch (err) {
      if (err.message === "Unauthorized") {
        navigate("/auth");
      }
      console.error("Error al eliminar la lista:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSelectedList = (list, folder) => {
    setSelectedList(list);
    sessionStorage.setItem("selectedList", JSON.stringify(list));

    setSelectedFolder(folder);
    sessionStorage.setItem("selectedFolder", JSON.stringify(folder));

    navigate("/tasks");
  };

  const modalSelectFolder = (title = null, folderId) => {
    setModalSelectedFolder({ title, folderId });
  };

  const unSelectList = () => {
    setSelectedList(null);
    setModalSelectedFolder({});
    sessionStorage.removeItem("selectedList");
    sessionStorage.removeItem("selectedFolder");
  };

  const closeAllFolders = () => {
    const allFolderCollapses = document.querySelectorAll(".folder-collapse");
    allFolderCollapses.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  const value = {
    getFoldersAndLists,
    folders,
    lists,
    selectedList,
    modalSelectFolder,
    modalSelectedFolder,
    selectedFolder,
    updateSelectedList,
    handleDeleteFolder,
    handleCreateFolder,
    handleCreateList,
    deleteListById,
    unSelectList,
    closeAllFolders,
    isLoading,
    isCreating,
  };

  return (
    <FoldersContext.Provider value={value}>
      {children}
    </FoldersContext.Provider>
  );
};
