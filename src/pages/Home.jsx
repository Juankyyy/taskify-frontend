import { MainLayout } from "../Layouts/MainLayout";
import { Greetings } from "../components/Home/Greetings";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useFolders } from "../hooks/useFolders";

export const Home = () => {
  const { getFoldersAndLists } = useFolders();

  useEffect(() => {
    getFoldersAndLists();
  }, [])

  return (
    <MainLayout>
      <main className="flex flex-col items-center justify-between w-full h-[calc(100dvh-20px)] gap-2.5">
        <Greetings />
        <Outlet />
      </main>
      <Toaster />
    </MainLayout>
  );
};
