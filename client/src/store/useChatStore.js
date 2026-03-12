import { create } from "zustand";
import api from "../services/api";
import { toast } from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  // class diagram attribute & method
  users: [],
  messages: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,
  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await api.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Get users failed");
    } finally {
      set({ isUserLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await api.post(
        "/message/send/" + selectedUser._id,
        messageData,
      );
      // messages เป็น array เลย ใช้ [...messages, res.data] เพื่อ copy message เก่าด้วย
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message || "Sending message failed");
    }
  },
  getMessage: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await api.get(`/message/${userId}`);
      set({ message: res.data });
    } catch (error) {
      toast.error(error.response.data.message || "getting messages failed");
    } finally {
      set({ isMessageLoading: false });
    }
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
