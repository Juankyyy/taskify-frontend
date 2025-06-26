import { MainLayout } from "../Layouts/MainLayout";
import { Greetings } from "../components/Home/Greetings";

export const Home = () => {
  // 🧠 Logic

  return (
    <MainLayout>
      <main className="flex flex-col items-center justify-between w-full gap-2.5">
        <Greetings />
      </main>
    </MainLayout>
  );
};
