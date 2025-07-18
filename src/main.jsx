// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { TasksProvider } from "./contexts/Task/TasksProvider";
import { FoldersProvider } from "./contexts/Folders/FoldersProvider.jsx";
import { App } from "./App.jsx";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FoldersProvider>
      <TasksProvider>
        <App />
      </TasksProvider>
    </FoldersProvider>
  </BrowserRouter>
);
