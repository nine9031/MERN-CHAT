import { create } from "zustand";
import api from "../services/api";
import { useAuthStore } from "./useAuthStore";
import toast from "react-hot-toast";
import {
  getMessage,
  sendMessage,
} from "../../../../server/controllers/message.controller";

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUsersLoaded: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoaded: true });
    try {
      const response = await api.get("/messages/users");
      set({ users: response.data });
    } catch (error) {
      toast.error(error.response.data.message || "get users failed");
    } finally {
      set({ isUsersLoaded: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const response = await api.post(
        "/messages/send/" + selectedUser._id,
        messageData,
      );
      set({ messages: [...messages, response.data] });
    } catch (error) {
      toast.error(error.response.data.message || "Sending message failed");
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const response = await api.get(`/messages/${userId}`);
      set({ messages: response.data });
    } catch (error) {
      toast.error(error.response.data.message || "Getting messages failed");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
