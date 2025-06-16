import { Plus } from "lucide-react";
import { Collapse } from "../Collapse";

export const Lists = () => {
  // 🧠 Logic

  return (
    <section className="flex flex-col">
      <div className="flex w-full items-center justify-between mb-4">
        <h1 className="text-lg font-bold">Lists</h1>
        <Plus className="w-4 h-4 bg-sky-400 rounded-full stroke-3 stroke-white p-0.5 cursor-pointer" />
      </div>

      <Collapse title={"Tareas diarias"}>
        <h1>Casa</h1>
        <h1>Trabajo</h1>
        <h1>Inversiones</h1>
        <h1>Finanzas</h1>
      </Collapse>
    </section>
  );
};
