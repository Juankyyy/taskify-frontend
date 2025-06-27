import { Plus } from "lucide-react";
import { Tooltip } from "../Tooltip";
import { Collapse } from "../Collapse";
import { useFolders } from "../../hooks/useFolders";

export const Folders = () => {
  const { folders, lists, isLoading,  } = useFolders();
  

  if (isLoading) return <p>Cargando carpetas...</p>;

  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center justify-between mb-5">
        <h1 className="text-lg font-bold">Carpetas</h1>
        <Tooltip title={"Nueva carpeta"}>
          <Plus className="w-7 h-7 p-1 bg-sky-400 rounded-full stroke-3 stroke-white cursor-pointer hover:animate-squeeze hover:animate-duration-500" />
        </Tooltip>
      </div>

      {folders.map((folder) => {
        const listsInFolder = lists.filter(
          (list) => list.folder === folder._id
        );

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
