import Navbar from "./components/Navbar";
import AppRoutes from "./routes/Router"; // Router ที่เราทำไว้
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast"; // <--- Import ตรงนี้

const App = () => {
  const { checkAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div data-theme={theme}>
      <Navbar />
      <AppRoutes />

      {/* ใส่ Toaster ไว้ระดับบนสุด เพื่อให้แสดงทับทุกหน้า */}
      <Toaster />
    </div>
  );
};

export default App;
