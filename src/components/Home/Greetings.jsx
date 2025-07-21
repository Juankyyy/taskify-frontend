import { useState } from "react";
import { TimeGreeting } from "../../utils/timeGreeting";
import { randomQuotes } from "../../utils/randomQuotes";

export const Greetings = () => {
  const username = localStorage.getItem("username");

  const { dateName } = TimeGreeting();

  const [quote, setQuote] = useState(() => randomQuotes().quote);

  return (
    <section className="bg-base-200/50 p-5 rounded-xl w-full sm:block hidden">
      <h1 className="font-bold text-3xl">
        {dateName}, {username ? username : "Unknown User"}!
      </h1>
      <p className="text-gray-300 [html[data-theme=light]_&]:text-gray-500">
        {quote}
      </p>
    </section>
  );
};
