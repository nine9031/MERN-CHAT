import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { getMessage } from "../../../../server/controllers/message.controller";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser?._id);

  useEffect(() => {
    getMessage(selectedUser?._id);
  }, [selectedUser?._id]);

  return (
    <div className="px-4 py-3 border-b border-base-300 bg-base-200/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <img
              src={selectedUser?.profilePicture || "/avatar.png"}
              alt={selectedUser?.fullname}
              className="w-10 h-10 rounded-full object-cover border border-base-300"
            />
            {isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-base-200" />
            )}
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-semibold text-base-content">
              {selectedUser?.fullname}
            </h3>
            <p className="text-xs text-base-content/50">
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-lg hover:bg-base-300/50 text-base-content/50 hover:text-base-content transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
