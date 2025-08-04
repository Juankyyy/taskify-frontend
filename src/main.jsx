// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { TasksProvider } from "./contexts/Task/TasksProvider";
import { FoldersProvider } from "./contexts/Folders/FoldersProvider.jsx";
import { UserProvider } from "./contexts/User/UserProvider.jsx";
import { App } from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <FoldersProvider>
        <TasksProvider>
          <App />
        </TasksProvider>
      </FoldersProvider>
    </UserProvider>
  </BrowserRouter>
);
