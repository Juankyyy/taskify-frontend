import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Languages } from "lucide-react";
import { EllipsisVertical } from "lucide-react";
import { Dropdown } from "../Dropdown";

import en from "../../assets/en-flag.svg";
import es from "../../assets/es-flag.svg";

export const Account = () => {
  const username = localStorage.getItem("username");

  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    sessionStorage.removeItem("selectedList");
    sessionStorage.removeItem("selectedFolder");
    navigate("/auth");
  };

  return (
    <div className="flex justify-between items-center bg-base-100 [html[data-theme=light]_&]:border-slate-300 p-2 border-transparent hover:border-slate-500! border rounded-lg transition-border-color">
      <div className="flex items-center justify-center gap-3">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
          </div>
        </div>
        <p className="font-bold">{username}</p>
      </div>

      <Dropdown
        icon={<EllipsisVertical className="cursor-pointer w-icon h-icon" />}
      >
        <li className="rounded-[4px]">
          <Dropdown
            icon={
              <div className="flex justify-between items-center ">
                <div className="flex gap-[7.7px]">
                  <Languages className="w-icon h-icon" />
                  <a>Idioma</a>
                </div>

                <ChevronRight className="w-icon h-icon" />
              </div>
            }
          >
            <li>
              <div>
                <img className="w-icon h-icon" src={es} alt="Spanish" />
                <p>Español</p>
              </div>
            </li>
            <li>
              <div>
                <img className="w-icon h-icon" src={en} alt="English" />
                <p>Inglés</p>
              </div>
            </li>
          </Dropdown>
        </li>

        <li>
          <button onClick={Logout}>
            <LogOut className="w-icon h-icon" />
            <p>Cerrar Sesión</p>
          </button>
        </li>
      </Dropdown>
    </div>
  );
};
