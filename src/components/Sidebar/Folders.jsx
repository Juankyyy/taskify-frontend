import { Plus } from "lucide-react";
import { Collapse } from "../Collapse";

export const Folders = () => {
  // 🧠 Logic

  return (
    <section className="flex flex-col">
      <div className="flex w-full items-center justify-between mb-4">
        <h1 className="text-lg font-bold">Carpetas</h1>
        <div className="lg:tooltip z-30" data-tip="Crear nueva carpeta">
          <Plus className="w-7 h-7 p-1 bg-sky-400 rounded-full stroke-3 stroke-white cursor-pointer hover:animate-squeeze hover:animate-duration-500" />
        </div>
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
