import React, { useState } from "react";
import {
  MessageSquare,
  Settings,
  User,
  LogOut,
  Camera,
  Mail,
} from "lucide-react";

const Profile = () => {
  // จำลอง State สำหรับเก็บข้อมูล User
  const [user, setUser] = useState({
    fullName: "John",
    email: "john@mail.com",
    memberSince: "2025-03-11",
    status: "Active",
  });

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#13161b] text-white">
      {/* --- Main Content --- */}
      <main className="flex-1 overflow-y-auto p-6 flex justify-center items-start pt-10">
        <div className="w-full max-w-2xl bg-[#181c23] border border-white/5 rounded-3xl p-8 lg:p-12 shadow-sm">
          {/* Header ของ Card Profile */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold mb-1">Profile</h1>
            <p className="text-slate-400 text-sm">Your profile information</p>
          </div>

          {/* ส่วนรูป Profile & อัปโหลดรูป */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4">
              {/* วงกลมรูปโปรไฟล์ */}
              <div className="w-32 h-32 rounded-full bg-[#2a303c] flex items-center justify-center border-4 border-white/5 overflow-hidden">
                <User className="w-16 h-16 text-slate-400" />
                {/* หากมีรูปภาพ สามารถใส่แท็ก <img src="..." className="w-full h-full object-cover" /> แทนไอคอน User ด้านบนได้ */}
              </div>

              {/* ปุ่มกล้องอัปโหลดรูป */}
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#2a303c] hover:bg-[#343a46] transition-colors rounded-full flex items-center justify-center border-4 border-[#181c23] text-slate-300 hover:text-white cursor-pointer">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Click the camera icon to update your photo
            </p>
          </div>

          {/* ฟอร์มข้อมูลผู้ใช้ */}
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                <User className="w-4 h-4 text-slate-400" />
                Full Name
              </label>
              <input
                type="text"
                value={user.fullName}
                readOnly
                className="w-full bg-[#13161b] border border-white/5 rounded-xl px-4 py-3.5 text-slate-200 focus:outline-none focus:border-[#ff7b5c] transition-colors"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                <Mail className="w-4 h-4 text-slate-400" />
                Email Address
              </label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full bg-[#13161b] border border-white/5 rounded-xl px-4 py-3.5 text-slate-200 focus:outline-none focus:border-[#ff7b5c] transition-colors"
              />
            </div>
          </div>

          {/* ส่วนข้อมูลบัญชี (Account Information) */}
          <div className="mt-10">
            <h2 className="text-base font-medium text-white mb-4">
              Account Information
            </h2>

            <div className="bg-[#13161b] rounded-xl border border-white/5 overflow-hidden">
              {/* Member Since */}
              <div className="flex justify-between items-center px-4 py-3 border-b border-white/5">
                <span className="text-sm text-slate-400">Member Since</span>
                <span className="text-sm text-slate-200">
                  {user.memberSince}
                </span>
              </div>

              {/* Account Status */}
              <div className="flex justify-between items-center px-4 py-3">
                <span className="text-sm text-slate-400">Account Status</span>
                <span className="text-sm font-medium text-emerald-500">
                  {user.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
