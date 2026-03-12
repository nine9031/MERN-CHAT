import React, { useEffect, useState, useRef } from "react";
import {
  MessageSquare,
  Users,
  X,
  Send,
  Image as ImageIcon,
} from "lucide-react"; // เพิ่มไอคอนส่งและรูป
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { formatMessageTime } from "../lib/utils";

const Home = () => {
  const {
    getUsers,
    setSelectedUser,
    isUsersLoading,
    selectedUser,
    users,
    getMessage,
    messages,
    isMessageLoading,
    sendMessage, // สมมติว่ามีฟังก์ชันนี้ใน store
  } = useChatStore();

  const { authUser, onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [text, setText] = useState("");
  const messageEndRef = useRef(null);

  // ดึงข้อมูลเมื่อเปลี่ยนคนคุย
  useEffect(() => {
    getUsers();
    if (selectedUser) getMessage(selectedUser._id);
  }, [getUsers, getMessage, selectedUser]);

  // Scroll ไปที่ข้อความล่าสุดอัตโนมัติ
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await sendMessage({
      text: text.trim(),
      // image: null (ถ้าต้องการรองรับรูปภาพในอนาคต)
    });
    setText("");
  };

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#13161b] text-white">
      <div className="flex flex-1 overflow-hidden">
        {/* --- SIDEBAR (เหมือนเดิม) --- */}
        <aside className="w-72 md:w-80 bg-[#181c23] border-r border-white/5 flex flex-col shrink-0">
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-2 text-slate-200 font-medium mb-4">
              <Users className="w-5 h-5" />
              <span>Contacts</span>
            </div>
            {/* Toggle Show Online... */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={showOnlineOnly}
                  onChange={() => setShowOnlineOnly(!showOnlineOnly)}
                />
                <div
                  className={`block w-10 h-6 rounded-full transition-colors ${showOnlineOnly ? "bg-[#ff7b5c]" : "bg-[#2a303c]"}`}
                ></div>
                <div
                  className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${showOnlineOnly ? "translate-x-4" : "translate-x-0"}`}
                ></div>
              </div>
              <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                Show online only{" "}
                <span className="text-green-500 ml-1">
                  ({Math.max(0, onlineUsers.length - 1)} online)
                </span>
              </span>
            </label>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            {isUsersLoading ? (
              <div className="flex justify-center items-center h-20 text-slate-500 text-sm italic">
                Loading...
              </div>
            ) : (
              filteredUsers.map((user) => (
                <button
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full p-4 flex items-center gap-3 transition-all hover:bg-[#232730] ${selectedUser?._id === user._id ? "bg-[#232730] border-r-2 border-[#ff7b5c]" : "border-r-2 border-transparent"}`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={
                        user.profilePic ||
                        "https://us-fbcloud.net/quiz/data/49/49900.qst1.question.jpg"
                      }
                      alt={user.fullname}
                      className="size-12 rounded-full object-cover border-2 border-white/5"
                    />
                    {onlineUsers.includes(user._id) && (
                      <span className="absolute bottom-0 right-0 size-3.5 bg-green-500 rounded-full ring-2 ring-[#181c23]" />
                    )}
                  </div>
                  <div className="text-left overflow-hidden">
                    <div className="font-semibold text-slate-100 truncate text-sm">
                      {user.fullname}
                    </div>
                    <div
                      className={`text-[11px] font-medium uppercase ${onlineUsers.includes(user._id) ? "text-green-500" : "text-slate-500"}`}
                    >
                      {onlineUsers.includes(user._id)
                        ? "Active Now"
                        : "Offline"}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </aside>

        {/* --- MAIN AREA (CHAT) --- */}
        <main className="flex-1 flex flex-col bg-[#13161b]">
          {!selectedUser ? (
            /* Welcome Screen (เหมือนเดิม) */
            <div className="flex-1 flex flex-col justify-center items-center p-6 text-center">
              <div className="w-20 h-20 bg-[#232730] flex items-center justify-center rounded-3xl mb-6 shadow-xl border border-white/5">
                <MessageSquare className="w-10 h-10 text-[#ff7b5c]" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Welcome to SE Chat
              </h2>
              <p className="text-slate-400 max-w-sm">
                Select a contact to start messaging.
              </p>
            </div>
          ) : (
            <>
              {/* --- CHAT HEADER --- */}
              <header className="h-[73px] px-6 bg-[#181c23]/50 border-b border-white/5 flex items-center justify-between backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={
                        selectedUser.profilePic ||
                        "https://www.marumura.com/wp-content/uploads/2023/05/anime-child-character.jpg"
                      }
                      className="size-10 rounded-full object-cover border border-white/10"
                      alt="Profile"
                    />
                    {onlineUsers.includes(selectedUser._id) && (
                      <span className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full ring-2 ring-[#181c23]" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white leading-tight">
                      {selectedUser.fullname}
                    </h3>
                    <p
                      className={`text-[11px] font-medium ${onlineUsers.includes(selectedUser._id) ? "text-green-500" : "text-slate-500"}`}
                    >
                      {onlineUsers.includes(selectedUser._id)
                        ? "Online"
                        : "Offline"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="hover:text-[#ff7b5c] text-slate-400 transition-colors"
                >
                  <X className="size-5" />
                </button>
              </header>

              {/* --- CHAT MESSAGES AREA --- */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((message) => {
                  // ป้องกันการ Render object ว่าง
                  if (!message) return null;

                  const isMine = message.senderId === authUser?._id;

                  return (
                    <div
                      key={message._id || Math.random()}
                      className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] flex flex-col ${isMine ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`px-4 py-2 rounded-2xl text-sm shadow-sm ${
                            isMine
                              ? "bg-[#ff7b5c] text-white rounded-tr-none"
                              : "bg-[#232730] text-slate-100 rounded-tl-none border border-white/5"
                          }`}
                        >
                          {/* ตรวจสอบว่ามีข้อความ (text) หรือไม่ */}
                          {message.text && (
                            <p className="whitespace-pre-wrap leading-relaxed">
                              {message.text}
                            </p>
                          )}

                          {message.image && (
                            <img
                              src={message.image}
                              alt="Attachment"
                              className="max-w-[200px] rounded-md mt-1"
                            />
                          )}
                        </div>

                        {/* แสดงเวลาเฉพาะเมื่อมีข้อมูล createdAt */}
                        {message.createdAt && (
                          <span className="text-[10px] text-slate-500 mt-1 px-1">
                            {formatMessageTime(message.createdAt)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div ref={messageEndRef} />
              </div>

              {/* --- CHAT INPUT AREA --- */}
              <div className="p-4 bg-[#13161b] border-t border-white/5">
                <form
                  onSubmit={handleSendMessage}
                  className="max-w-4xl mx-auto flex items-center gap-2"
                >
                  <div className="flex-1 flex items-center gap-2 bg-[#181c23] rounded-xl px-4 py-2 border border-white/5 focus-within:border-[#ff7b5c]/50 transition-all">
                    <button
                      type="button"
                      className="text-slate-400 hover:text-[#ff7b5c]"
                    >
                      <ImageIcon className="size-5" />
                    </button>
                    <input
                      type="text"
                      className="flex-1 bg-transparent border-none focus:outline-none text-sm py-1"
                      placeholder="Type a message..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!text.trim()}
                    className="size-10 bg-[#ff7b5c] hover:bg-[#ff6b4a] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors"
                  >
                    <Send className="size-5 text-white" />
                  </button>
                </form>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
