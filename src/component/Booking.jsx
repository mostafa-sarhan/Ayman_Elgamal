import React, { useState, useEffect } from "react";

const URL = "https://dr-ayman.onrender.com/";

export default function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    type: "",
    date: "",
    time: "",
    age: "",
    gender: "",
  });

  const [popup, setPopup] = useState({ message: "", type: "" });
  const [slots, setSlots] = useState([]);

  // جلب الأيام القادمة
  const getDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push({
        day: d.toLocaleDateString("ar-EG", { weekday: "short" }),
        date: d.toISOString().split("T")[0],
        full: d.getDate(),
      });
    }
    return days;
  };

  // جلب المواعيد المتاحة
  const fetchSlots = async (date) => {
    if (!date) return setSlots([]);
    try {
      const res = await fetch(`${URL}schedule/${date}`);
      const data = await res.json();
      setSlots(data.slots || []);
    } catch (err) {
      console.error(err);
      setSlots([]);
    }
  };

  useEffect(() => {
    fetchSlots(formData.date);
  }, [formData.date]);

  // إرسال الحجز
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return setPopup({ message: "الاسم مطلوب", type: "error" });
    if (!/^\d{8,15}$/.test(formData.phone)) return setPopup({ message: "رقم الهاتف غير صالح", type: "error" });
    if (!formData.type) return setPopup({ message: "اختر نوع الزيارة", type: "error" });
    if (!formData.date) return setPopup({ message: "اختر التاريخ", type: "error" });
    if (!formData.time) return setPopup({ message: "اختر الوقت", type: "error" });
    if (!formData.age || isNaN(Number(formData.age))) return setPopup({ message: "السن مطلوب ويكون رقم", type: "error" });
    if (!formData.gender) return setPopup({ message: "اختر النوع", type: "error" });

    try {
      const bookedDate = formData.date;
      const res = await fetch(`${URL}bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, status: "pending" }),
      });

      const data = await res.json();

      if (res.ok) {
        setPopup({ message: data.message || "تم الحجز بنجاح!", type: "success" });
        setFormData({ name: "", phone: "", type: "", date: "", time: "", age: "", gender: "" });
      } else {
        setPopup({ message: data.message || "حدث خطأ أثناء الحجز", type: "error" });
      }

      fetchSlots(bookedDate);
      console.log(data);
    } catch (err) {
      console.error(err);
      setPopup({ message: "حدث خطأ أثناء الاتصال بالسيرفر", type: "error" });
      fetchSlots(formData.date);
    }

    setTimeout(() => setPopup({ message: "", type: "" }), 3000);
  };

  // تحويل أرقام عربية إلى إنجليزية
  const handlePhoneChange = (value) => {
    const arabicNums = "٠١٢٣٤٥٦٧٨٩";
    const englishNums = "0123456789";
    const converted = value
      .split("")
      .map((c) => (arabicNums.indexOf(c) !== -1 ? englishNums[arabicNums.indexOf(c)] : c))
      .join("");
    const numbersOnly = converted.replace(/[^0-9]/g, "");
    setFormData({ ...formData, phone: numbersOnly });
  };

  // تنسيق الوقت
  const formatTime = (time) => {
    if (!time) return "";
    let [hourStr, minute] = time.split(":");
    let hour = parseInt(hourStr);
    const period = hour >= 12 ? "م" : "ص";
    hour = hour % 12 || 12;
    return `${hour.toString().padStart(2, "0")}:${minute} ${period}`;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 space-y-8">
          {popup.message && (
            <div className={`mt-4 p-3 text-center rounded-lg text-white ${popup.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
              {popup.message}
            </div>
          )}

          <h2 className="text-3xl font-bold text-center text-gray-800">احجز موعدك الآن</h2>

          {/* الاسم + الهاتف */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="الاسم الكامل"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="رقم الهاتف"
              value={formData.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              className="p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* السن + النوع */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="السن"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="p-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">اختر النوع</option>
              <option value="ذكر">ذكر</option>
              <option value="أنثى">أنثى</option>
            </select>
          </div>

          {/* نوع الزيارة */}
          <div className="flex gap-3 flex-wrap justify-center">
            {["كشف", "متابعة", "استشارة"].map((type) => (
              <button
                key={type}
                onClick={() => setFormData({ ...formData, type })}
                className={`px-5 py-2 rounded-xl border transition cursor-pointer ${formData.type === type ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-blue-100"}`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* الأيام */}
          <div className="flex gap-3 justify-center items-center overflow-x-auto pb-2">
            {getDays().map((d, i) => (
              <button
                key={i}
                onClick={() => setFormData({ ...formData, date: d.date, time: "" })}
                className={`min-w-17.5 p-3 rounded-xl border text-center cursor-pointer ${formData.date === d.date ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-blue-100"}`}
              >
                <div className="text-sm">{d.day}</div>
                <div className="font-bold">{d.full}</div>
              </button>
            ))}
          </div>

          {/* الأوقات */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {slots.length === 0 && formData.date && <p className="col-span-4 text-gray-500">لا يوجد مواعيد متاحة لهذا اليوم</p>}
            {slots.map((slot) => {
              const status = slot.status; // "available", "booked", "closed"
              const isSelected = formData.time === slot.time;

              let bgClass = "";
              let textClass = "text-gray-700";
              let disabled = false;
              let statusText = "";

              switch (status) {
                case "available":
                  bgClass = isSelected ? "bg-blue-600 text-white" : "bg-green-100 hover:bg-green-200";
                  statusText = "متاح";
                  break;
                case "booked":
                  bgClass = "bg-red-200 text-gray-500 cursor-not-allowed";
                  statusText = "محجوز";
                  disabled = true;
                  break;
                case "closed":
                  bgClass = "bg-yellow-200 text-gray-600 cursor-not-allowed";
                  statusText = "مغلق";
                  disabled = true;
                  break;
                default:
                  bgClass = "bg-gray-100";
                  statusText = "";
              }

              return (
                <button
                  key={slot.time}
                  onClick={() => !disabled && setFormData({ ...formData, time: slot.time })}
                  disabled={disabled}
                  className={`p-3 rounded-xl cursor-pointer border transition font-semibold text-center ${bgClass} ${isSelected ? "border-2 border-blue-700" : ""}`}
                >
                  {formatTime(slot.time)}
                  <p className="text-sm">{statusText}</p>
                </button>
              );
            })}
          </div>

          {/* زر تأكيد الحجز */}
          <button
            onClick={handleSubmit}
            disabled={!formData.name || !formData.phone || !formData.type || !formData.date || !formData.time || !formData.age || !formData.gender}
            className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            تأكيد الحجز
          </button>
        </div>
      </div>
    </section>
  );
}