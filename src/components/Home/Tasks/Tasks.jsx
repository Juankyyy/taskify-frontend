import { useTasks } from "../../../hooks/useTasks";
import { Task } from "./Task";

export const Tasks = () => {
  const { selectedList } = useTasks();

  return (
    <section className="bg-base-200 p-5 rounded-xl w-full h-full">
      <h1 className="font-bold text-3xl mb-8">{selectedList.title}</h1>

      <div>
        <Task />
      </div>
    </section>
  );
};
