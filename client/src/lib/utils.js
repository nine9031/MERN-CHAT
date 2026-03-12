export const formatMessageTime = (date) => {
  // 1. ถ้ายังไม่มีค่า date (เช่นตอนกำลังส่ง) ให้คืนค่าว่าง หรือ "Sending..."
  if (!date) return "";

  const parsedDate = new Date(date);

  // 2. เช็คว่าเป็นวันที่ที่ใช้งานได้จริงหรือไม่
  if (isNaN(parsedDate.getTime())) return "";

  // 3. แสดงผลรูปแบบ HH:mm (24 ชั่วโมง)
  return parsedDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
