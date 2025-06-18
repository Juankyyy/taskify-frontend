import { LogOut } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Languages } from "lucide-react";
import { EllipsisVertical } from "lucide-react";
import { Dropdown } from "../Dropdown";

import en from "../../assets/en-flag.svg";
import es from "../../assets/es-flag.svg";

export const Account = () => {
  // 🧠 Logic

  return (
    <div className="flex justify-between items-center p-2 border-transparent hover:border-slate-300 border rounded-lg transition-colors">
      <div className="flex gap-3">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
          </div>
        </div>
        <div>
          <h1 className="font-bold">Username</h1>
          <p className="text-sm text-slate-400">Username#12345</p>
        </div>
      </div>

      <Dropdown
        direction={"top"}
        icon={<EllipsisVertical className="cursor-pointer w-icon h-icon" />}
      >
        <li className="hover:bg-slate-200 rounded-[4px]">
          <Dropdown
            direction="right"
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
              <div className="hover:bg-slate-200">
                <img className="w-icon h-icon" src={es} alt="Spanish" />
                <p>Español</p>
              </div>
            </li>
            <li>
              <div className="hover:bg-slate-200">
                <img className="w-icon h-icon" src={en} alt="English" />
                <p>Inglés</p>
              </div>
            </li>
          </Dropdown>
        </li>

        <li>
          <div className="hover:bg-slate-200">
            <LogOut className="w-icon h-icon" />
            <a>Cerrar Sesión</a>
          </div>
        </li>
      </Dropdown>
    </div>
  );
};
