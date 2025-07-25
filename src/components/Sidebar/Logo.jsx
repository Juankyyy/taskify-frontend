import { useFolders } from "../../hooks/useFolders";
import { useLocation, useNavigate } from "react-router-dom";
import { Theme } from "./Theme";
import { Tooltip } from "../Tooltip";
import { Plus } from "lucide-react";

export const Logo = () => {
  const { unSelectList, closeAllFolders } = useFolders();

  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";

  const clearLists = () => {
    navigate("/");
    unSelectList();
    closeAllFolders();
  };

  return (
    <div className="flex gap-1 items-center sm:mb-5 mb-3 justify-between">
      <div
        onClick={clearLists}
        className="flex items-center gap-1 cursor-pointer"
      >
        <img width="20px" height="20px" src="/taskify.png" alt="Taskify Logo" />
        <h1 className="sm:text-2xl text-xl font-bold">Taskify</h1>
      </div>
      {!isAuthPage && (
        <div className="sm:hidden block">
          <Theme />
        </div>
      )}
      <Tooltip title={"Nueva carpeta"}>
        <Plus
          onClick={() =>
            document.getElementById("create-folder-modal").showModal()
          }
          className="w-6 h-6 p-1 bg-sky-400 rounded-full stroke-3 stroke-white cursor-pointer hover:animate-squeeze hover:animate-duration-500 sm:hidden block"
        />
      </Tooltip>
    </div>
  );
};
