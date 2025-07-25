import { useContext } from "react";
import { FoldersContext } from "../contexts/Folders/FoldersContext";

export const useFolders = () => {
  const context = useContext(FoldersContext);

  if (!context) {
    throw new Error("useFolders must be used within a FoldersProvider");
  }

  return context;
};