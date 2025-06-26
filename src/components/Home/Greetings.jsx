import { TimeGreeting } from "../../utils/timeGreeting";

export const Greetings = () => {
  const username = localStorage.getItem("username");

  const { dateName } = TimeGreeting();

  return (
    <section className="bg-base-200 p-4 rounded-xl w-full">
      <h1 className="font-bold text-3xl">
        {dateName}, {username ? username : "Unknown User"}!
      </h1>
      <p className="text-gray-500">¿Qué tienes planeado para hoy?</p>
    </section>
  );
};
