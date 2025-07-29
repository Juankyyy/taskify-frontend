import { Link, useNavigate } from "react-router-dom";
import { LogOut, Settings } from "lucide-react";
import { Dropdown } from "../Dropdown";
import { DefaultAvatar } from "../DefaultAvatar";

export const Account = () => {
  const username = localStorage.getItem("username");
  const avatar = localStorage.getItem("avatar");

  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    sessionStorage.removeItem("selectedList");
    sessionStorage.removeItem("selectedFolder");
    navigate("/auth");
  };

  return (
    <div className="flex justify-between items-center bg-base-300/50 hover:bg-base-300 [html[data-theme=light]_&]:border-slate-300 [html[data-theme=light]_&]:hover:border-slate-500 p-2 px-3 border-slate-600 hover:border-slate-500 border rounded-lg transition-border-color-bg">
      <div className="flex items-center justify-center gap-3">
        <div className="avatar">
          <div className="sm:w-10 w-8 rounded-full">
            {avatar != "undefined" ? (
              <img src={avatar} alt="avatar" />
            ) : (
              <DefaultAvatar />
            )}
          </div>
        </div>
        <p className="font-bold">{username}</p>
      </div>

      <Dropdown>
        <li>
          <Link to="/settings">
            <Settings className="w-icon h-icon" />
            <p>Ajustes</p>
          </Link>
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
