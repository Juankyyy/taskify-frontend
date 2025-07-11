import { MainLayout } from "../Layouts/MainLayout";
import { Greetings } from "../components/Home/Greetings";
import { Tasks } from "../components/Home/Tasks/Tasks";
import { Toaster } from "react-hot-toast";

export const Home = () => {
  // 🧠 Logic

  return (
    <MainLayout>
      <main className="flex flex-col items-center justify-between w-full h-[calc(100dvh-20px)] gap-2.5">
        <Greetings />
        <Tasks />
      </main>
      <Toaster />
    </MainLayout>
  );
};
