import React from "react";
import {
  MessageSquare,
  Settings,
  User,
  LogOut,
  Users,
  X,
  Image as ImageIcon,
  Send,
} from "lucide-react";

const ChatRoom = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#13161b] text-white">
      {/* --- ส่วนเนื้อหาหลัก (แบ่งซ้าย-ขวา) --- */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: รายชื่อผู้ติดต่อ (ด้านซ้าย) */}
        <aside className="w-20 md:w-72 bg-[#181c23] border-r border-white/5 flex flex-col shrink-0">
          {/* Tab ไอคอน Users ด้านบน */}
          <div className="p-4 border-b border-white/5 flex justify-center md:justify-start">
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Users className="w-5 h-5" />
            </button>
          </div>

          {/* รายชื่อเพื่อน (แสดงแบบ Avatar) */}
          <div className="flex-1 overflow-y-auto p-2">
            {/* Active User Item (คนที่กำลังเปิดแชทอยู่) */}
            <div className="flex items-center gap-3 p-2 bg-white/5 border border-white/10 rounded-xl cursor-pointer">
              {/* Avatar + Online Indicator */}
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center overflow-hidden">
                  {/* ใส่รูปภาพจริงตรงนี้ หรือใช้ไอคอนจำลองไปก่อน */}
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas&backgroundColor=b6e3f4"
                    alt="Thomas"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* จุดสีเขียว (Online) */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#181c23]"></div>
              </div>

              {/* ชื่อ (ซ่อนในจอมือถือ แสดงในจอใหญ่) */}
              <div className="hidden md:block overflow-hidden">
                <div className="text-sm font-medium text-white truncate">
                  Thomas
                </div>
                <div className="text-xs text-slate-400 truncate">Online</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Chat Area: พื้นที่แชทหลัก (ด้านขวา) */}
        <main className="flex-1 flex flex-col bg-[#13161b] relative">
          {/* Chat Header (แถบชื่อเพื่อนด้านบนแชท) */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-[#13161b]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas&backgroundColor=b6e3f4"
                    alt="Thomas"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#13161b]"></div>
              </div>
              <div>
                <h2 className="text-sm font-medium text-white">Thomas</h2>
                <p className="text-xs text-slate-400">Online</p>
              </div>
            </div>

            {/* ปุ่มปิดแชท (X) */}
            <button className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body (พื้นที่ข้อความ) */}
          <div className="flex-1 p-6 flex flex-col justify-end overflow-y-auto">
            {/* แจ้งเตือน: ต้องเป็นเพื่อนกันก่อน */}
            <div className="flex justify-center items-center gap-2 mb-4 flex-wrap text-center">
              <span className="text-sm text-red-500">
                You must be friends with this user to send messages.
              </span>
              <button className="text-sm text-slate-200 bg-[#2a303c] hover:bg-[#343a46] px-3 py-1.5 rounded-lg transition-colors font-medium">
                Add Friend
              </button>
            </div>
          </div>

          {/* Chat Input (ช่องพิมพ์ข้อความ - สถานะ Disabled) */}
          <div className="p-4 bg-[#13161b] border-t border-white/5">
            <div className="flex items-center gap-2 bg-[#181c23] border border-white/5 rounded-xl px-4 py-2">
              <input
                type="text"
                placeholder="Type a message..."
                disabled // ปิดไม่ให้พิมพ์
                className="flex-1 bg-transparent text-sm text-slate-300 placeholder-slate-600 focus:outline-none py-2 cursor-not-allowed"
              />

              {/* ปุ่มส่งรูปภาพ */}
              <button
                disabled
                className="p-2 text-slate-600 cursor-not-allowed"
              >
                <ImageIcon className="w-5 h-5" />
              </button>

              {/* ปุ่ม Send */}
              <button
                disabled
                className="p-2 text-slate-600 cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatRoom;
