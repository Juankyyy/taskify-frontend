import { Plus } from "lucide-react";
import { Tooltip } from "../Tooltip";
import { Collapse } from "../Collapse";
import { ModalDelete } from "../Modals/ModalDelete";
import { CreateFolderList } from "../Modals/CreateFolderList";
import { useFolders } from "../../hooks/useFolders";

export const Folders = () => {
  const {
    folders,
    lists,
    modalSelectedFolder,
    selectedList,
    updateSelectedList,
    handleDeleteFolder,
    handleCreateFolder,
    isLoading,
    isCreating,
  } = useFolders();

  const initialForm = {
    folderName: "",
  };

  return (
    <div className="flex flex-col sm:max-h-[640px] max-h-[230px] overflow-y-auto overflow-x-hidden">
      <div className="w-full items-center justify-between sm:mb-5 mb-3 sm:flex hidden">
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

      {isLoading ? (
        <div className="flex items-center justify-center flex-1">
          <div className="flex flex-col items-center gap-2">
            <span className="loading loading-dots loading-lg"></span>
            <p className="text-sm text-gray-500">Cargando carpetas...</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-1.5 flex-1">
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
                        className={`px-2 w-min cursor-pointer truncate max-w-[153px] transition-text-weight ${
                          selectedList && selectedList._id === list._id
                            ? "font-bold bg-gray-200 [html[data-theme=dark]_&]:bg-gray-600 rounded-md"
                            : ""
                        }`}
                        onClick={() => updateSelectedList(list, folder)}
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
      )}

      <ModalDelete
        title={modalSelectedFolder.title}
        handleDelete={handleDeleteFolder}
        isLoading={isLoading}
        type="folder"
        modalId="delete-folder-modal"
      />

      <CreateFolderList
        handleCreate={handleCreateFolder}
        isLoading={isCreating}
        initialForm={initialForm}
        type="folder"
      />
    </div>
  );
};
