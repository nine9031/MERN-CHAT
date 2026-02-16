import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Loader } from "lucide-react";

// Import Pages
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import SettingsPage from "../pages/SettingsPage";
import ProfilePage from "../pages/ProfilePage";

const AppRoutes = () => {
  const { authUser, isCheckingAuth } = useAuthStore();

  // แสดง Loading ระหว่างที่กำลังเช็คว่า User Login อยู่หรือไม่
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Condition:
        - authUser ? <Page/> : <Navigate to="/login"/>  --> ต้อง Login ก่อนถึงจะเข้าได้
        - !authUser ? <Page/> : <Navigate to="/"/>     --> ต้อง "ไม่" Login ถึงจะเข้าได้ (เช่นหน้า Login/Register)
      */}

      <Route
        path="/"
        element={authUser ? <HomePage /> : <Navigate to="/login" />}
      />

      <Route
        path="/signup"
        element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
      />

      <Route
        path="/login"
        element={!authUser ? <LoginPage /> : <Navigate to="/" />}
      />

      <Route path="/settings" element={<SettingsPage />} />

      <Route
        path="/profile"
        element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default AppRoutes;
