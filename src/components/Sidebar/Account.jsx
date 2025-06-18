import { LogOut } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Languages } from "lucide-react";
import { ChevronDown } from "lucide-react";

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

      <div className="dropdown dropdown-top">
        <div tabIndex={0} role="button">
          <ChevronDown className="cursor-pointer" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-content rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <div className="hover:bg-slate-200">
              <Languages className="w-icon h-icon" />
              <a>Idioma</a>
              <ChevronRight className="w-icon h-icon" />
            </div>
          </li>
          <li>
            <div className="hover:bg-slate-200">
              <LogOut className="w-icon h-icon" />
              <a>Cerrar Sesión</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
