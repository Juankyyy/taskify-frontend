import { Task } from "./Task";

export const Tasks = () => {
  // 🧠 Logic

  return (
    <section className="bg-base-200 p-4 rounded-xl w-full h-full">
      <h1 className="font-bold text-3xl mb-8">Tasks</h1>

      <div>
        <Task />
      </div>
    </section>
  );
};
