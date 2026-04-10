import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const URL = "https://dr-ayman.onrender.com";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export default function BookToday() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ضبط التاريخ الحالي
  const today = new Date().toISOString().split("T")[0];

  // جلب الحجوزات
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${URL}/bookings`, {
        headers: getAuthHeaders(),
      });

      const data = await res.json();

      // فلترة حجوزات اليوم
      const todayBookings = (data.bookings || []).filter(
        (b) => b.date === today
      );

      setBookings(todayBookings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${dayName} الموافق ${day}-${month}-${year}`;
  };

  if (loading)
    return (
      <p className="text-center mt-4 text-gray-600">
        جاري التحميل...
      </p>
    );

  return (
    <div className="space-y-6 px-4 py-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        حجوزات اليوم
      </h2>

      <p className="text-center text-gray-600 mb-4">
        {formatDate(today)}
      </p>

      {/* Desktop */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-right">الاسم</th>
              <th className="p-3 text-right">رقم الهاتف</th>
              <th className="p-3 text-right">التاريخ</th>
              <th className="p-3 text-right">الوقت</th>
              <th className="p-3 text-right">الحالة</th>
              <th className="p-3 text-center">الإجراء</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-right">{b.name}</td>
                <td className="p-3 text-right">{b.phone}</td>
                <td className="p-3 text-right">{b.date}</td>
                <td className="p-3 text-right">{b.time}</td>

                <td className="p-3 text-right">
                  {b.status === "confirmed" ? (
                    <span className="text-green-600 font-semibold">
                      تم التأكيد
                    </span>
                  ) : b.status === "cancelled" ? (
                    <span className="text-red-600 font-semibold">
                      ملغي
                    </span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">
                      قيد الانتظار
                    </span>
                  )}
                </td>

                <td className="p-3 text-center">
                  {b.status === "confirmed" && (
                    <button
                      onClick={() =>
                        navigate(`/visit/${b.phone}`)
                      }
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                    >
                      ابدأ الكشف
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="lg:hidden space-y-4">
        {bookings.map((b) => {
          let bgColor = "bg-yellow-100";
          let statusColor = "text-yellow-800";

          if (b.status === "confirmed") {
            bgColor = "bg-green-100";
            statusColor = "text-green-800";
          } else if (b.status === "cancelled") {
            bgColor = "bg-red-100";
            statusColor = "text-red-800";
          }

          return (
            <div
              key={b._id}
              className={`${bgColor} shadow-md rounded-lg p-4`}
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-lg">
                  {b.name}
                </span>
                <span className="text-gray-500">
                  {b.phone}
                </span>
              </div>

              <div className="text-sm text-gray-600 mb-1">
                {b.date} - {b.time}
              </div>

              <div className={`${statusColor} font-semibold mb-2`}>
                {b.status === "confirmed"
                  ? "تم التأكيد"
                  : b.status === "cancelled"
                  ? "ملغي"
                  : "قيد الانتظار"}
              </div>

              {b.status === "confirmed" && (
                <button
                  onClick={() =>
                    navigate(`/visit/${b.phone}`)
                  }
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                  ابدأ الكشف
                </button>
              )}
            </div>
          );
        })}

        {bookings.length === 0 && (
          <p className="text-center text-gray-500">
            لا توجد حجوزات لليوم
          </p>
        )}
      </div>
    </div>
  );
}