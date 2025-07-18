import { useFolders } from "../../hooks/useFolders";
import { useNavigate } from "react-router-dom";

export const Logo = () => {
  const { unSelectList } = useFolders();

  const navigate = useNavigate();

  const clearLists = () => {
    unSelectList();
    navigate("/");
  };

  return (
    <div className="flex gap-1 items-center mb-5">
      <div
        onClick={clearLists}
        className="flex items-center gap-1 cursor-pointer"
      >
        <img width="20px" height="20px" src="/taskify.png" alt="Taskify Logo" />
        <h1 className="text-2xl font-bold">Taskify</h1>
      </div>
    </div>
  );
};
