import React from "react";
import { MessageSquare, Settings, User, LogOut } from "lucide-react";

const Navbar = ({ activePage }) => {
  // ฟังก์ชันตัวช่วยสำหรับกำหนด Class ของปุ่ม
  const getButtonClass = (pageName) => {
    const isActive = activePage === pageName;
    const baseClass =
      "flex items-center gap-2 text-sm transition-colors px-3 py-2 rounded-lg border ";

    // ถ้าหน้าปัจจุบันตรงกับปุ่ม ให้ปุ่มสว่างและมีเส้นขอบ
    if (isActive) {
      return baseClass + "text-white bg-white/5 border-white/10";
    }
    // ถ้าไม่ใช่ ให้เป็นปุ่มใสๆ และสว่างเมื่อเอาเมาส์ชี้
    return (
      baseClass +
      "text-slate-300 hover:text-white bg-transparent hover:bg-white/5 border-transparent"
    );
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[#181c23] border-b border-white/5 shrink-0 sticky top-0 z-50">
      {/* --- โลโก้ซ้ายบน --- */}
      <div className="flex items-center gap-2 font-medium text-white cursor-pointer hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 rounded bg-[#ff7b5c]/10 flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-[#ff7b5c]" />
        </div>
        SE Chat
      </div>

      {/* --- เมนูด้านขวา --- */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* ปุ่ม Settings */}
        <button className={getButtonClass("settings")}>
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Settings</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
