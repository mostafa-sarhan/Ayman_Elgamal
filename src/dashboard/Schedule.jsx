import React, { useEffect, useState } from "react";

const URL = "https://dr-ayman.onrender.com/";

export default function Schedule() {
  const [date, setDate] = useState(getToday());
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);


  // تحميل البيانات عند تغيير التاريخ
  useEffect(() => {
    fetchSchedule();
  }, [date]);


  // 🔄 جلب المواعيد
  const fetchSchedule = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${URL}schedule/${date}`);
      const data = await res.json();
      setSlots(data.slots || []);
    } catch (err) {
      console.error("Error fetching schedule:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 تغيير حالة المعاد
  const toggleSlot = async (time, status) => {
    let newStatus;
    if (status === "available") newStatus = "closed";
    else if (status === "closed") newStatus = "available";
    else return; // لو محجوز مينفعش نغير

    try {
      await fetch(`${URL}schedule/${date}/updateStatus`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ time, status: newStatus }),
      });

      setSlots((prev) =>
        prev.map((slot) =>
          slot.time === time ? { ...slot, status: newStatus } : slot
        )
      );
    } catch (err) {
      console.error("Error updating slot:", err);
    }
  };

  // تحويل التاريخ للعربي
  function formatDateArabic(date) {
    if (!date) return "";

    const days = [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];

    const d = new Date(date);
    const dayName = days[d.getDay()];
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    return `${dayName} ${day}-${month}-${year}`;
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        جاري تحميل جدول المواعيد...
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">جدول المواعيد</h2>

      {/* اختيار التاريخ */}
      <div className="flex justify-center items-center flex-col  mb-6">
        <input
          type="date"
          className="border p-2 rounded-lg shadow-sm"
          value={date}
          min={getToday()}
          onChange={(e) => setDate(e.target.value)}
        />
        <p className="mt-2 text-gray-600 font-medium">
          {formatDateArabic(date)}
        </p>
        <p className="mt-2 text-gray-600 font-medium">
        </p>
          <h3>اضغط على أي ميعاد لتغيير حالته (متاح ↔ مغلق)</h3>
      </div>

      {/* المواعيد */}
      {slots.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {slots.map((slot) => (
            <div
              key={slot.time}
              onClick={() => toggleSlot(slot.time, slot.status)}
              className={`p-4 text-center rounded-xl cursor-pointer transition-all duration-200 font-semibold shadow-sm ${
                slot.status === "available"
                  ? "bg-green-200 hover:bg-green-300"
                  : slot.status === "closed"
                  ? "bg-red-200 hover:bg-red-300"
                  : "bg-yellow-200 cursor-not-allowed"
              }`}
            >
              <p className="text-lg">{formatTime(slot.time)}</p>
              <p className="text-sm mt-1">
                {slot.status === "available"
                  ? "متاح"
                  : slot.status === "closed"
                  ? "مغلق"
                  : "محجوز"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          لا يوجد مواعيد (سيتم إنشاؤها تلقائيًا)
        </p>
      )}
    </div>
  );
}

// 📅 تاريخ اليوم
function getToday() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

// 🕒 تحويل الوقت للعربي
function formatTime(time) {
  const [hour, minute] = time.split(":");
  let h = parseInt(hour);

  const period = h >= 12 ? "م" : "ص";
  if (h > 12) h -= 12;
  if (h === 0) h = 12;

  return `${h}:${minute} ${period}`;
}