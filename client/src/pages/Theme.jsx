import React, { useState } from "react";
import { MessageSquare, Settings, User, LogOut, Send } from "lucide-react";

// --- ข้อมูลจำลองสำหรับ Themes ---
// (ใส่สีตัวอย่างให้ใกล้เคียงกับภาพ เพื่อให้ปุ่ม Preview เปลี่ยนสีตามได้)
const THEMES = [
  {
    name: "Light",
    colors: ["#570df8", "#f000b8", "#37cdbe", "#191D24"],
    primary: "#570df8",
  },
  {
    name: "Dark",
    colors: ["#661AE6", "#D926AA", "#1FB2A5", "#191D24"],
    primary: "#661AE6",
  },
  {
    name: "Cupcake",
    colors: ["#65c3c8", "#ef9fbc", "#eeaf3a", "#291334"],
    primary: "#65c3c8",
  },
  {
    name: "Bumblebee",
    colors: ["#e0a82e", "#f9d72f", "#181830", "#ffffff"],
    primary: "#e0a82e",
  },
  {
    name: "Emerald",
    colors: ["#66cc8a", "#377cfb", "#ea5234", "#333c4d"],
    primary: "#66cc8a",
  },
  {
    name: "Corporate",
    colors: ["#4b6bfb", "#7b92b2", "#67cba0", "#181a2f"],
    primary: "#4b6bfb",
  },
  {
    name: "Synthwave",
    colors: ["#e779c1", "#58c7f3", "#f3cc30", "#20134e"],
    primary: "#e779c1",
  },
  {
    name: "Retro",
    colors: ["#ef9995", "#a4cbb4", "#ebdc99", "#282425"],
    primary: "#ef9995",
  },
  {
    name: "Cyberpunk",
    colors: ["#ff7598", "#75d1f0", "#c07eec", "#343232"],
    primary: "#ff7598",
  },
  {
    name: "Valentine",
    colors: ["#e96d7b", "#a991f7", "#88e3c2", "#af4670"],
    primary: "#e96d7b",
  },
  {
    name: "Halloween",
    colors: ["#f28c18", "#6d3a9c", "#51a800", "#212121"],
    primary: "#f28c18",
  },
  {
    name: "Garden",
    colors: ["#5c7f67", "#ecf4e7", "#fae5e5", "#324322"],
    primary: "#5c7f67",
  },
  {
    name: "Forest",
    colors: ["#1eb854", "#1db88e", "#1db8ab", "#19362d"],
    primary: "#1eb854",
  },
  {
    name: "Aqua",
    colors: ["#09ecf3", "#966fb3", "#ffe999", "#3b8ea5"],
    primary: "#09ecf3",
  },
  {
    name: "Lofi",
    colors: ["#808080", "#e5e5e5", "#242424", "#0d0d0d"],
    primary: "#808080",
  },
  {
    name: "Pastel",
    colors: ["#d1c1d7", "#f6cbd1", "#b4e9d6", "#70acc7"],
    primary: "#d1c1d7",
  },
  {
    name: "Fantasy",
    colors: ["#6e0b75", "#007ebd", "#f8860d", "#1f2937"],
    primary: "#6e0b75",
  },
  {
    name: "Wireframe",
    colors: ["#b8b8b8", "#b8b8b8", "#b8b8b8", "#ebebeb"],
    primary: "#b8b8b8",
  },
  {
    name: "Black",
    colors: ["#343232", "#343232", "#343232", "#000000"],
    primary: "#343232",
  },
  {
    name: "Luxury",
    colors: ["#ffffff", "#152747", "#513448", "#171618"],
    primary: "#ffffff",
  },
  {
    name: "Dracula",
    colors: ["#ff79c6", "#bd93f9", "#ffb86c", "#282a36"],
    primary: "#ff79c6",
  },
  {
    name: "Cmyk",
    colors: ["#45AEEE", "#E8488A", "#FFF232", "#1a1a1a"],
    primary: "#45AEEE",
  },
  {
    name: "Autumn",
    colors: ["#8C0327", "#D85251", "#D59B6A", "#f1f1f1"],
    primary: "#8C0327",
  },
  {
    name: "Business",
    colors: ["#1C4E80", "#7E909A", "#EA6951", "#202020"],
    primary: "#1C4E80",
  },
  {
    name: "Acid",
    colors: ["#FF00FF", "#FF00FF", "#FF00FF", "#111111"],
    primary: "#FF00FF",
  },
  {
    name: "Lemonade",
    colors: ["#519903", "#E9E92E", "#FDF8BA", "#ffffff"],
    primary: "#519903",
  },
  {
    name: "Night",
    colors: ["#38bdf8", "#818cf8", "#f472b6", "#0f172a"],
    primary: "#38bdf8",
  },
  {
    name: "Coffee",
    colors: ["#20161F", "#3D4451", "#C59f60", "#120C12"],
    primary: "#C59f60",
  },
  {
    name: "Winter",
    colors: ["#047AFF", "#463AA1", "#C149AD", "#E2E8F0"],
    primary: "#047AFF",
  },
  {
    name: "Dim",
    colors: ["#9ABA53", "#A88DCD", "#7EBBBC", "#2A303C"],
    primary: "#9ABA53",
  },
  {
    name: "Nord",
    colors: ["#5E81AC", "#81A1C1", "#88C0D0", "#2E3440"],
    primary: "#5E81AC",
  },
  {
    name: "Sunset",
    colors: ["#ff7b5c", "#a8a29e", "#1c1917", "#13161b"],
    primary: "#ff7b5c",
  },
];

const Theme = () => {
  // ตั้งค่าเริ่มต้นเป็น Sunset ตามธีมหลักของแอป
  const [activeTheme, setActiveTheme] = useState(
    THEMES.find((t) => t.name === "Sunset"),
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#13161b] text-white">
      {/* --- Main Content --- */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Section: Theme Selector */}
          <div>
            <h1 className="text-2xl font-semibold mb-1">Theme</h1>
            <p className="text-slate-400 text-sm mb-6">
              Choose a theme for your chat interface
            </p>

            {/* Grid แสดง Themes */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
              {THEMES.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => setActiveTheme(theme)}
                  className={`flex flex-col items-center gap-2 p-2 rounded-xl transition-all ${
                    activeTheme.name === theme.name
                      ? "bg-white/10 ring-1 ring-white/20"
                      : "hover:bg-white/5"
                  }`}
                >
                  {/* กล่องสี 4 สี (Preview Theme) */}
                  <div className="w-full h-8 rounded-lg overflow-hidden flex shadow-sm">
                    <div
                      className="flex-1"
                      style={{ backgroundColor: theme.colors[0] }}
                    ></div>
                    <div
                      className="flex-1"
                      style={{ backgroundColor: theme.colors[1] }}
                    ></div>
                    <div
                      className="flex-1"
                      style={{ backgroundColor: theme.colors[2] }}
                    ></div>
                    <div
                      className="flex-1"
                      style={{ backgroundColor: theme.colors[3] }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-slate-300">
                    {theme.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Section: Preview */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Preview</h2>

            {/* กล่องครอบ Preview ใหญ่ */}
            <div className="bg-[#181c23] border border-white/5 rounded-2xl p-6 lg:p-10 flex justify-center items-center shadow-sm">
              {/* หน้าต่าง Chat จำลอง */}
              <div className="w-full max-w-lg bg-[#13161b] rounded-xl border border-white/5 shadow-lg overflow-hidden flex flex-col">
                {/* แถบด้านบนของ Chat */}
                <div className="flex items-center gap-3 p-4 border-b border-white/5 bg-[#181c23]">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: activeTheme.primary }} // สีเปลี่ยนตาม Theme
                  >
                    J
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm">
                      John Doe
                    </div>
                    <div className="text-xs text-slate-400">Online</div>
                  </div>
                </div>

                {/* พื้นที่แชท (ข้อความ) */}
                <div className="p-4 space-y-4 min-h-[200px] flex flex-col justify-end">
                  {/* ข้อความฝั่งคนอื่น (ซ้าย) */}
                  <div className="flex flex-col gap-1 items-start">
                    <div className="bg-[#2a303c] text-slate-200 px-4 py-2.5 rounded-2xl rounded-tl-none text-sm max-w-[85%]">
                      Hey! How's it going?
                    </div>
                    <span className="text-[10px] text-slate-500 ml-1">
                      12:00 PM
                    </span>
                  </div>

                  {/* ข้อความฝั่งเรา (ขวา) */}
                  <div className="flex flex-col gap-1 items-end">
                    <div
                      className="text-white px-4 py-2.5 rounded-2xl rounded-tr-none text-sm max-w-[85%] shadow-sm"
                      style={{ backgroundColor: activeTheme.primary }} // สีเปลี่ยนตาม Theme
                    >
                      I'm doing great! Just working on some new features.
                    </div>
                    <span className="text-[10px] text-slate-500 mr-1">
                      12:00 PM
                    </span>
                  </div>
                </div>

                {/* กล่องพิมพ์ข้อความ */}
                <div className="p-4 bg-[#181c23] border-t border-white/5 flex gap-2">
                  <input
                    type="text"
                    placeholder="This is a preview"
                    disabled
                    className="flex-1 bg-[#13161b] border border-white/10 rounded-lg px-4 text-sm text-slate-300 placeholder-slate-500 focus:outline-none"
                  />
                  <button
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-colors"
                    style={{ backgroundColor: activeTheme.primary }} // สีเปลี่ยนตาม Theme
                  >
                    <Send className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Theme;
