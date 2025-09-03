import { ArrowLeft, UserRoundPen } from "lucide-react";
import { Link } from "react-router-dom";
import { Theme } from "../components/Sidebar/Theme";
import { Toaster } from "react-hot-toast";
import { Avatar } from "../components/Settings/Avatar";
import { UserInfo } from "../components/Settings/UserInfo";
import { Language } from "../components/Settings/Language";
import { ChangePassword } from "../components/Settings/ChangePassword";

export const Settings = () => {
  return (
    <main className="m-5 h-[calc(100dvh-40px)] bg-base-100 rounded-2xl">
      <nav className="p-3 px-6 rounded-2xl flex justify-between items-center">
        <Link to={"/"} className="animate-fade-in-left btn">
          <ArrowLeft />
          Volver
        </Link>
        <h1 className="animate-fade-in text-xl font-bold">Ajustes</h1>
        <div className="animate-fade-in-right w-[105.47px]">
          <Theme />
        </div>
      </nav>

      <section className="m-3">
        <article className="flex flex-col gap-3 p-3">
          <div className="animate-fade-in-right flex gap-2 items-center">
            <UserRoundPen className="w-icon h-icon" />
            <h2 className="text-lg font-bold">Perfil</h2>
          </div>

          <div className="flex flex-col items-center justify-center">
            <Avatar />

            <UserInfo />
          </div>
        </article>

        <ChangePassword />

        <Language />
      </section>
      <Toaster />
    </main>
  );
};
