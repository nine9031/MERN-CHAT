import React from "react";
import {
  MessageSquare,
  Settings,
  User,
  X,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useLocation } from "react-router"; // แนะนำให้ใช้ useLocation เพื่อเช็ค active page อัตโนมัติ

const Navbar = () => {
  const { authUser, logOut } = useAuthStore();
  const location = useLocation(); // ดึง path ปัจจุบันมาเช็ค active state

  // ฟังก์ชันช่วยกำหนด Class (ปรับปรุงเล็กน้อย)
  const getButtonClass = (path) => {
    const isActive = location.pathname === path;
    const baseClass =
      "flex items-center gap-2 text-sm transition-all px-3 py-2 rounded-lg border ";

    if (isActive) {
      return baseClass + "text-white bg-white/10 border-white/20 shadow-sm";
    }
    return (
      baseClass +
      "text-slate-300 hover:text-white bg-transparent hover:bg-white/5 border-transparent"
    );
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[#181c23] border-b border-white/5 shrink-0 sticky top-0 z-50">
      {/* --- โลโก้ซ้ายบน --- */}
      <Link
        to="/"
        className="flex items-center gap-2 font-medium text-white cursor-pointer hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 rounded-lg bg-[#ff7b5c]/10 flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-[#ff7b5c]" />
        </div>
        <span className="tracking-tight">SE Chat</span>
      </Link>

      {/* --- เมนูด้านขวา --- */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* ปุ่ม Settings */}
        <Link to="/settings" className={getButtonClass("/settings")}>
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Settings</span>
        </Link>

        {authUser ? (
          <>
            {/* ปุ่ม Profile */}
            <Link to="/profile" className={getButtonClass("/profile")}>
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </Link>

            {/* ปุ่ม Logout (ใช้เป็น button เพราะต้องยิง function) */}
            <button
              onClick={logOut}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition-colors px-3 py-2"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        ) : (
          <>
            {/* ปุ่ม Login */}
            <Link to="/login" className={getButtonClass("/login")}>
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
            </Link>

            {/* ปุ่ม Register (เน้นสีส้มให้เด่น) */}
            <Link
              to="/register"
              className="flex items-center gap-2 text-sm bg-[#ff7b5c] hover:bg-[#ff6a47] text-white px-3 py-2 rounded-lg transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Register</span>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
