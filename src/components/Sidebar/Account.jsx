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

      <ChevronDown className="cursor-pointer" />
      
    </div>
  );
};
