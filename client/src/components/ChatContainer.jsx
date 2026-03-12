import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { Loader } from "lucide-react";

const formatTime = (dateStr) => {
  return new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  // Fetch messages + subscribe on selected user change
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }

    return () => unsubscribeFromMessages();
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col">
        <ChatHeader />
        <div className="flex-1 flex items-center justify-center">
          <Loader className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => {
          const isSent = message.sender === authUser?._id;
          return (
            <div
              key={message._id}
              className={`flex ${isSent ? "justify-end" : "justify-start"}`}
            >
              {/* Avatar for received messages */}
              {!isSent && (
                <img
                  src={selectedUser?.profilePicture || "/avatar.png"}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover border border-base-300 mr-2 mt-auto shrink-0"
                />
              )}

              <div className={`max-w-[70%] ${isSent ? "order-1" : ""}`}>
                {/* Image attachment */}
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="rounded-xl mb-1.5 max-w-[250px] border border-base-300"
                  />
                )}

                {/* Text bubble */}
                {message.text && (
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isSent
                        ? "bg-primary text-white rounded-br-md"
                        : "bg-base-200 text-base-content rounded-bl-md"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                {/* Timestamp */}
                <p
                  className={`text-[10px] mt-1 text-base-content/40 ${
                    isSent ? "text-right" : "text-left"
                  }`}
                >
                  {formatTime(message.createdAt)}
                </p>
              </div>

              {/* Avatar for sent messages */}
              {isSent && (
                <img
                  src={authUser?.profilePicture || "/avatar.png"}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover border border-base-300 ml-2 mt-auto shrink-0"
                />
              )}
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
