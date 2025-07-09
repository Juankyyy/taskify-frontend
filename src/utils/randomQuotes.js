export const randomQuotes = () => {
  const quotes = [
    "¿Qué tienes planeado para hoy? 🗓️",
    "¿Qué tarea harás primero? ✅",
    "¿Qué avance quieres lograr hoy? 📈",
    "Un paso a la vez… ¿cuál es el primero? 👣",
    "¿Qué tarea hará tu día más ligero? 🌤️",
    "¿Qué tarea te gustaría hacer primero? 📝",
    "Hoy es un buen día para avanzar. 🚀",
    "¡Hoy es un gran día para ser productivo! 💪",
    "¡Hora de organizar tu día! 🗂️",
    "¡Tú puedes con todo lo que viene! 🔥",
    "¿Qué te gustaría lograr antes de terminar el día? 🎯",
    "¡Una tarea a la vez, tú puedes! 🧠",
    "¡Tacha una tarea y gana +10 de autoestima! 🏆",
    "No hagas todo hoy… deja algo para mañana también. 😉",
    "Las tareas no se hacen solas… créeme, ya intenté. 🤖",
    "Tus tareas te están mirando fijamente. 👀",
    "Esta lista no se va a tachar sola (ojalá). 😅",
    "Respira… y luego tacha una tarea como si nada. 😌",
    "No es flojera, es ahorro de energía. 🔋",
    "Tu “yo del futuro” te lo va a agradecer… o reclamar. 🕰️",
    "La tarea más difícil es abrir esta app. Lo lograste. 🎉",
  ];

  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return {
    quote,
  };
};
