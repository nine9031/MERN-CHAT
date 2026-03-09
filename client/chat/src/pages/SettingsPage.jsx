import { THEMES } from "../constants/themes";
import { useThemeStore } from "../store/useThemeStore";
import { Settings as SettingsIcon, Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen pt-16 bg-base-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* Theme Section */}
        <div>
          <h2 className="text-lg font-semibold text-base-content mb-1">
            Theme
          </h2>
          <p className="text-sm text-base-content/60 mb-5">
            Choose a theme for your chat interface
          </p>

          {/* Theme Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
            {THEMES.map((t) => (
              <button
                key={t.name}
                onClick={() => setTheme(t.name)}
                className={`group flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all cursor-pointer
                  ${
                    theme === t.name
                      ? "bg-base-200 ring-2 ring-primary"
                      : "hover:bg-base-200/50"
                  }`}
              >
                {/* Color Swatches */}
                <div className="flex gap-0.5 w-full justify-center">
                  {t.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-4 h-8 first:rounded-l-md last:rounded-r-md"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                {/* Label */}
                <span className="text-[11px] font-medium text-base-content/70 truncate w-full text-center">
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div>
          <h2 className="text-lg font-semibold text-base-content mb-4">
            Preview
          </h2>

          <div className="rounded-2xl border border-base-300 overflow-hidden bg-base-100 shadow-lg max-w-lg mx-auto">
            {/* Preview Header */}
            <div className="px-4 py-3 border-b border-base-300 bg-base-200">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                  J
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-base-content">
                    John Doe
                  </h3>
                  <p className="text-xs text-base-content/50">Online</p>
                </div>
              </div>
            </div>

            {/* Preview Messages */}
            <div className="p-4 space-y-4 min-h-[200px] bg-base-100">
              {PREVIEW_MESSAGES.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm shadow-sm
                      ${
                        msg.isSent
                          ? "bg-primary text-white"
                          : "bg-base-200 text-base-content"
                      }`}
                  >
                    <p>{msg.content}</p>
                    <p
                      className={`text-[10px] mt-1.5 ${msg.isSent ? "text-white/70" : "text-base-content/40"}`}
                    >
                      12:00 PM
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Preview Input */}
            <div className="px-4 py-3 border-t border-base-300 bg-base-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className="flex-1 h-10 px-4 text-sm rounded-xl bg-base-100 border border-base-300 text-base-content placeholder-base-content/40 outline-none"
                  placeholder="This is a preview"
                  readOnly
                />
                <button className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
