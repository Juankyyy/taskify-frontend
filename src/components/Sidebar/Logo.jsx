import { useFolders } from "../../hooks/useFolders";
import { useNavigate } from "react-router-dom";
import { Theme } from "./Theme";

export const Logo = () => {
  const { unSelectList, closeAllFolders } = useFolders();

  const navigate = useNavigate();

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
      <div className="sm:hidden block">
        <Theme />
      </div>
    </div>
  );
};
