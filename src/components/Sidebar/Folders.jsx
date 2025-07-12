import { Plus } from "lucide-react";
import { Tooltip } from "../Tooltip";
import { Collapse } from "../Collapse";
import { useFolders } from "../../hooks/useFolders";
import { DeleteFolder } from "../Modals/DeleteFolder";
import { CreateFolder } from "../Modals/CreateFolder";
import { useTasks } from "../../hooks/useTasks";

export const Folders = () => {
  const {
    folders,
    lists,
    selectedFolder,
    selectFolder,
    handleDeleteFolder,
    handleCreateFolder,
    handleCreateList,
    isLoading,
  } = useFolders();

  const initialForm = {
    folderName: "",
  };

  const { updateSelectedList, selectedList } = useTasks();

  if (isLoading) return <p>Cargando carpetas...</p>;

  return (
    <div className="flex flex-col h-[640px]">
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

      <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto overflow-x-hidden">
        {folders.map((folder) => {
          const listsInFolder = lists.filter(
            (list) => list.folder === folder._id
          );

          const isSelectedListInFolder =
            selectedList &&
            listsInFolder.some((list) => list._id === selectedList._id);

          return (
            <Collapse
              key={folder._id}
              title={folder.name}
              folderId={folder._id}
              selectFolder={selectFolder}
              handleCreateList={handleCreateList}
              selectedFolderTitle={selectedFolder.title}
              defaultOpen={isSelectedListInFolder}
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

                    <p
                      title={list.title}
                      className={`px-2 w-min cursor-pointer truncate max-w-[153px] transition-all ${
                        selectedList && selectedList._id === list._id
                          ? "font-bold bg-gray-100 [html[data-theme=dark]_&]:bg-gray-600 rounded-md"
                          : ""
                      }`}
                      onClick={() => updateSelectedList(list, folder._id)}
                    >
                      {list.title}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 px-2 -ml-4">No hay Listas</p>
              )}
            </Collapse>
          );
        })}
      </div>

      <DeleteFolder
        title={selectedFolder.title}
        folderId={selectedFolder.folderId}
        handleDeleteFolder={handleDeleteFolder}
      />

      <CreateFolder
        handleCreate={handleCreateFolder}
        isLoading={isLoading}
        initialForm={initialForm}
        type="folder"
      />
    </div>
  );
};
