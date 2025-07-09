import { useTasks } from "../../hooks/useTasks";

export const Logo = () => {
  const { unSelectList } = useTasks();

  return (
    <div className="flex gap-1 items-center mb-5">
      <div
        onClick={unSelectList}
        className="flex items-center gap-1 cursor-pointer"
      >
        <img width="20px" height="20px" src="/taskify.png" alt="Taskify Logo" />
        <h1 className="text-2xl font-bold">Taskify</h1>
      </div>
    </div>
  );
};
