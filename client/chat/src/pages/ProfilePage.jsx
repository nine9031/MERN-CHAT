import { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { User, Mail, Camera, Loader2 } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePicture: base64Image });
    };
  };

  return (
    <div className="min-h-dvh pt-16 bg-base-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-base-content tracking-tight">
            Profile
          </h1>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-base-200 border border-base-300 p-6 sm:p-8 space-y-8">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={selectedImg || authUser?.profilePicture || "/avatar.png"}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-base-300"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUpdatingProfile}
                className={`absolute bottom-1 right-1 w-9 h-9 rounded-full bg-base-300 border border-base-100 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                {isUpdatingProfile ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Camera className="w-4 h-4" />
                )}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </div>
            <p className="text-xs text-base-content/40">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Info Fields */}
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-base-content/50 flex items-center gap-2 uppercase tracking-wider">
                <User className="w-3.5 h-3.5" />
                Full Name
              </div>
              <p className="px-4 py-3 bg-base-300/50 rounded-xl border border-base-300 text-base-content text-sm">
                {authUser?.fullname || "—"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-base-content/50 flex items-center gap-2 uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5" />
                Email
              </div>
              <p className="px-4 py-3 bg-base-300/50 rounded-xl border border-base-300 text-base-content text-sm">
                {authUser?.email || "—"}
              </p>
            </div>
          </div>

          {/* Account Info */}
          <div className="border-t border-base-300 pt-6">
            <h2 className="text-sm font-semibold text-base-content mb-4 uppercase tracking-wider">
              Account Information
            </h2>
            <div className="space-y-1">
              <div className="flex items-center justify-between py-3 border-b border-base-300/50 text-sm">
                <span className="text-base-content/60">Member Since</span>
                <span className="text-base-content">
                  {authUser?.createdAt
                    ? new Date(authUser.createdAt).toLocaleDateString()
                    : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 text-sm">
                <span className="text-base-content/60">Account Status</span>
                <span className="text-green-400 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
