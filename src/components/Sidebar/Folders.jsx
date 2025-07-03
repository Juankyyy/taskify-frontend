import { Plus } from "lucide-react";
import { Tooltip } from "../Tooltip";
import { Collapse } from "../Collapse";
import { useFolders } from "../../hooks/useFolders";
import { DeleteFolder } from "../Modals/DeleteFolder";
import { CreateFolder } from "../Modals/CreateFolder";

export const Folders = () => {
  const {
    folders,
    lists,
    selectedFolder,
    onDeleteClick,
    handleDeleteFolder,
    handleCreateFolder,
    isLoading,
  } = useFolders();

  if (isLoading) return <p>Cargando carpetas...</p>;

  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center justify-between mb-5">
        <h1 className="text-lg font-bold">Carpetas</h1>
        <Tooltip title={"Nueva carpeta"}>
          <Plus
            onClick={() =>
              document.getElementById("create-folder-modal").showModal()
            }
            className="w-7 h-7 p-1 bg-sky-400 rounded-full stroke-3 stroke-white cursor-pointer hover:animate-squeeze hover:animate-duration-500"
          />
        </Tooltip>
      </div>

      {folders.map((folder) => {
        const listsInFolder = lists.filter(
          (list) => list.folder === folder._id
        );

        return (
          <Collapse
            key={folder._id}
            title={folder.name}
            folderId={folder._id}
            onDeleteClick={onDeleteClick}
          >
            {listsInFolder.length > 0 ? (
              listsInFolder.map((list, index) => (
                <div key={list._id} className="relative">
                  <div
                    className={`absolute -left-2 top-0 bottom-0 w-0.5 bg-gray-300 [html[data-theme=dark]_&]:bg-gray-600 ${
                      index === listsInFolder.length - 1 ? "h-1" : "h-7"
                    }`}
                  ></div>
                  <div className="absolute -left-2 top-0.5 w-2 h-3 border-l-2 border-b-2 border-gray-300 [html[data-theme=dark]_&]:border-gray-600 rounded-bl-md"></div>

                  <p className="px-2 w-min cursor-pointer">{list.title}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 px-2 -ml-4">No hay Listas</p>
            )}
          </Collapse>
        );
      })}

      <DeleteFolder
        title={selectedFolder.title}
        folderId={selectedFolder.folderId}
        handleDeleteFolder={handleDeleteFolder}
      />

      <CreateFolder
        handleCreateFolder={handleCreateFolder}
        isLoading={isLoading}
      />
    </div>
  );
};
