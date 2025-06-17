import { Plus } from "lucide-react";
import { Trash } from "lucide-react";

import { Tooltip } from "../Tooltip";
import { Collapse } from "../Collapse";

export const Folders = () => {
  // 🧠 Logic

  return (
    <section className="flex flex-col">
      <div className="flex w-full items-center justify-between mb-5">
        <h1 className="text-lg font-bold">Carpetas</h1>
        <Tooltip title={"Nueva carpeta"}>
          <Plus className="w-7 h-7 p-1 bg-sky-400 rounded-full stroke-3 stroke-white cursor-pointer hover:animate-squeeze hover:animate-duration-500" />
        </Tooltip>
      </div>

      <Collapse title={"Carpeta 1"}>
        <h1>Lista 1</h1>
        <h1>Lista 2</h1>
        <h1>Lista 3</h1>
        <h1>Lista 4</h1>
      </Collapse>
    </section>
  );
};
