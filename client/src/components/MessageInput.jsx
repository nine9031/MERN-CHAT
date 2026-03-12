import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      // Error handled in store
    }
  };

  return (
    <div className="px-4 py-3 border-t border-base-300 bg-base-200/30">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-base-300"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 text-base-content flex items-center justify-center cursor-pointer hover:bg-red-500 hover:text-white transition-colors"
              type="button"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Input Row */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            className="flex-1 h-11 px-4 text-sm rounded-xl bg-base-200 border border-base-300 text-base-content placeholder-base-content/30 outline-none focus:border-primary transition-colors"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              imagePreview
                ? "text-primary border-primary/30 bg-primary/10"
                : "text-base-content/40 border-base-300 hover:text-base-content/70 hover:bg-base-200"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="w-5 h-5" />
          </button>
        </div>

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="p-2.5 rounded-xl bg-primary text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
