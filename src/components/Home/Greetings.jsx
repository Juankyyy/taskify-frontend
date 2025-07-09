import { TimeGreeting } from "../../utils/timeGreeting";
import { randomQuotes } from "../../utils/randomQuotes";

export const Greetings = () => {
  const username = localStorage.getItem("username");

  const { dateName } = TimeGreeting();

  const { quote } = randomQuotes();

  return (
    <section className="bg-base-200 p-5 rounded-xl w-full">
      <h1 className="font-bold text-3xl">
        {dateName}, {username ? username : "Unknown User"}!
      </h1>
      <p className="text-gray-400">{quote}</p>
    </section>
  );
};
