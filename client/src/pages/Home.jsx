import React, { useState } from "react";
import { MessageSquare, Settings, User, LogOut, Users } from "lucide-react";

const Home = () => {
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#13161b] text-white">
      {/* --- ส่วนเนื้อหาหลัก (แบ่งซ้าย-ขวา) --- */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: รายชื่อผู้ติดต่อ (ด้านซ้าย) */}
        <aside className="w-72 md:w-80 bg-[#181c23] border-r border-white/5 flex flex-col shrink-0">
          {/* ส่วนหัวของ Sidebar */}
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2 text-slate-200 font-medium mb-4">
              <Users className="w-5 h-5" />
              Contacts
            </div>

            {/* Toggle Switch: Show online only */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={showOnlineOnly}
                  onChange={() => setShowOnlineOnly(!showOnlineOnly)}
                />
                {/* พื้นหลัง Toggle */}
                <div
                  className={`block w-10 h-6 rounded-full transition-colors ${showOnlineOnly ? "bg-[#ff7b5c]" : "bg-[#2a303c]"}`}
                ></div>
                {/* วงกลม Toggle */}
                <div
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${showOnlineOnly ? "translate-x-4" : "translate-x-0"}`}
                ></div>
              </div>
              <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                Show online only{" "}
                <span className="text-slate-500">(0 online)</span>
              </span>
            </label>
          </div>

          {/* พื้นที่แสดงรายชื่อ (Empty State) */}
          <div className="flex-1 flex justify-center items-center text-sm text-slate-500">
            No online users
          </div>
        </aside>

        {/* Main Chat Area: พื้นที่แชทหลัก (ด้านขวา) */}
        <main className="flex-1 flex flex-col justify-center items-center bg-[#13161b] p-6 text-center">
          {/* ไอคอนตรงกลาง */}
          <div className="w-16 h-16 bg-[#232730] flex items-center justify-center rounded-2xl mb-6 shadow-sm">
            <MessageSquare className="w-8 h-8 text-[#ff7b5c]" />
          </div>

          {/* ข้อความต้อนรับ */}
          <h2 className="text-2xl font-bold text-white mb-3">
            Welcome to SE Chat!
          </h2>
          <p className="text-slate-400 max-w-md">
            Select a conversation from the sidebar to start chatting
          </p>
        </main>
      </div>
    </div>
  );
};

export default Home;
