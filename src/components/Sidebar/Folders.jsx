import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Tooltip } from "../Tooltip";
import { Collapse } from "../Collapse";

// Importamos los hooks personalizados
// import { getUser } from "../../hooks/getUser";
import { getFolders } from "../../hooks/getFolders";
import { getListsByFolder } from "../../hooks/getListsByFolder";

export const Folders = () => {
  const [folders, setFolders] = useState([]);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoldersAndLists = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token no encontrado");

        // eslint-disable-next-line no-unused-vars
        // const user = await getUser(token);
        const foldersData = await getFolders(token);
        const allLists = await getListsByFolder(foldersData, token);
        
        setFolders(foldersData);
        setLists(allLists);
      } catch (err) {
        console.error("Error al cargar las carpetas:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoldersAndLists();
  }, []);

  if (loading) return <p>Cargando carpetas...</p>;

  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center justify-between mb-5">
        <h1 className="text-lg font-bold">Carpetas</h1>
        <Tooltip title={"Nueva carpeta"}>
          <Plus className="w-7 h-7 p-1 bg-sky-400 rounded-full stroke-3 stroke-white cursor-pointer hover:animate-squeeze hover:animate-duration-500" />
        </Tooltip>
      </div>

      {folders.map((folder) => {
        const listsInFolder = lists.filter((list) => list.folder === folder._id);

        return (
          <Collapse key={folder._id} title={folder.name}>
            {listsInFolder.length > 0 ? (
              listsInFolder.map((list) => <h1 key={list._id}>{list.title}</h1>)
            ) : (
              <p className="text-sm text-gray-500">No hay Listas</p>
            )}
          </Collapse>
        );
      })}
    </div>
  );
};
