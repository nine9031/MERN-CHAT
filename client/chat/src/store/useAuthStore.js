import { create } from "zustand";
import api from "../services/api";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// useAuthStore เป็น react hook
// มี func set get มันจะประกาศ attibute ต่างๆ ที่แชร์กัน
// useAuthStore ไว้ใช้สำหรับจัดการ auth อย่างเดียว
export const useAuthStore = create((set, get) => ({
  // อันนี้เรากำหนด state ไว้แชร์กัน
  //   มีใคร login อยู่
  authUser: null,
  socket: null,
  //   ระบบเราเช็คอยู่ไหม
  //   design ไว้เพื่อ animation
  isCheckingAuth: true,
  //   เค้า sign up อยู่ไหม จะมี state check ตลอด
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  //   มี user online อยู่ไหม
  onlineUsers: [],
  //   func
  //   check ใคร login
  checkAuth: async () => {
    try {
      // เรียกใช้ api
      const response = await api.get("/user/check");
      set({ authUser: response.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in CheckAuth", error);
      set({ authUser: null });
      //   finally ทำเสมอ
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await api.post("/user/register", data);
      set({ authUser: response.data });
      get().connectSocket();
      toast.success("Account created successfuly");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "sign up failed");
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await api.post("/user/login", data);
      set({ authUser: response.data });
      get().connectSocket();
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Log in failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logOut: async () => {
    try {
      const response = await api.post("/user/logout");
      set({ authUser: null });
      get().disconnectSocket();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message || "Log out failed");
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await api.put("/user/update-profile", data);
      set({ authUser: response.data.user });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message || "Update profile failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser, socket } = get();

    // 1. เช็คก่อนเลยว่าถ้ามี socket เชื่อมต่ออยู่แล้วให้หยุดทำ
    if (!authUser || socket?.connected) return;

    const socketURL = import.meta.env.VITE_SOCKET_URL;

    // 2. สร้าง instance ใหม่พร้อม query
    const newSocket = io(socketURL, {
      query: {
        userId: authUser._id || authUser.id, // ใช้รองรับทั้ง _id และ id
      },
      // เพิ่มบรรทัดนี้เพื่อให้แน่ใจว่ามันจะไม่ไปใช้ connection เก่าที่อาจจะค้างอยู่
      forceNew: true,
    });

    // 3. จัดการสถานะ
    set({ socket: newSocket });

    // 4. รอรับ event จาก server
    newSocket.on("getOnlineUsers", (userIds) => {
      console.log("Online users received:", userIds); // เพิ่ม log เช็คฝั่งหน้าบ้าน
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) {
      socket.disconnect();
    }
  },
}));
