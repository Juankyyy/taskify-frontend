import { Languages } from "lucide-react";

export const Language = () => {
  return (
    <article className="flex flex-col gap-3 p-3">
      <div className="flex gap-2 items-center">
        <Languages className="w-icon h-icon" />
        <h2 className="text-lg font-bold">Idioma</h2>
        <div className="badge badge-primary">Proximamente!</div>
      </div>
    </article>
  );
};
