import React, { useState, useEffect } from "react";

const URL = "https://dr-ayman.onrender.com";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");

  // ضبط التاريخ الافتراضي = اليوم
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  // جلب الحجوزات
  useEffect(() => {
    fetchBookings();
  }, [selectedDate]);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${URL}/bookings`, {
        headers: getAuthHeaders(),
      });

      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // تأكيد الحجز
  const handleConfirm = async (id) => {
    try {
      const res = await fetch(`${URL}/bookings/${id}/confirm`, {
        method: "PATCH",
        headers: getAuthHeaders(),
      });

      const data = await res.json();

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? data.booking : b))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // إلغاء الحجز
  const handleCancel = async (id) => {
    try {
      const res = await fetch(`${URL}/bookings/${id}/cancel`, {
        method: "PATCH",
        headers: getAuthHeaders(),
      });

      const data = await res.json();

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? data.booking : b))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // إلغاء التأكيد
  const handleRevert = async (id) => {
    try {
      const res = await fetch(`${URL}/bookings/${id}/revert`, {
        method: "PATCH",
        headers: getAuthHeaders(),
      });

      const data = await res.json();

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? data.booking : b))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // حذف نهائي
  const handleDelete = async (id) => {
    try {
      await fetch(`${URL}/bookings/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return <p className="text-center mt-4 text-gray-600">جاري التحميل...</p>;

  // فلترة حسب التاريخ
  const filteredBookings = bookings.filter(
    (b) => b.date === selectedDate
  );

  return (
    <div className="space-y-6 px-4 py-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        الحجوزات
      </h2>

      {/* اختيار التاريخ */}
      <div className="flex justify-center mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded shadow-sm"
        />
      </div>

      <div className="overflow-x-auto">

        {/* Desktop Table */}
        <table className="hidden lg:table w-full bg-white shadow-md rounded-lg text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-right">الاسم</th>
              <th className="p-3 text-right">رقم الهاتف</th>
              <th className="p-3 text-right">التاريخ</th>
              <th className="p-3 text-right">الوقت</th>
              <th className="p-3 text-right">الحالة</th>
              <th className="p-3 text-center">الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((b) => (
              <tr key={b._id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-right">{b.name}</td>
                <td className="p-3 text-right">{b.phone}</td>
                <td className="p-3 text-right">{b.date}</td>
                <td className="p-3 text-right">{b.time}</td>

                <td className="p-3 text-right font-semibold">
                  {b.status === "confirmed" ? (
                    <span className="text-green-600">تم التأكيد</span>
                  ) : b.status === "cancelled" ? (
                    <span className="text-red-600">ملغي</span>
                  ) : (
                    <span className="text-yellow-600">قيد الانتظار</span>
                  )}
                </td>

                <td className="p-3 text-center space-x-2">

                  {b.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleConfirm(b._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        تأكيد
                      </button>

                      <button
                        onClick={() => handleCancel(b._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        إلغاء
                      </button>
                    </>
                  )}

                  {b.status === "confirmed" && (
                    <button
                      onClick={() => handleRevert(b._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      إلغاء التأكيد
                    </button>
                  )}

                  {b.status === "cancelled" && (
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800"
                    >
                      حذف نهائي
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {filteredBookings.map((b) => {
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
                  <span className="font-semibold">{b.name}</span>
                  <span>{b.phone}</span>
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

                <div className="flex gap-2">
                  {b.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleConfirm(b._id)}
                        className="flex-1 bg-green-600 text-white py-2 rounded"
                      >
                        تأكيد
                      </button>

                      <button
                        onClick={() => handleCancel(b._id)}
                        className="flex-1 bg-red-500 text-white py-2 rounded"
                      >
                        إلغاء
                      </button>
                    </>
                  )}

                  {b.status === "confirmed" && (
                    <button
                      onClick={() => handleRevert(b._id)}
                      className="bg-yellow-500 text-white px-3 py-2 rounded"
                    >
                      إلغاء التأكيد
                    </button>
                  )}

                  {b.status === "cancelled" && (
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="flex-1 bg-red-700 text-white py-2 rounded"
                    >
                      حذف نهائي
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {filteredBookings.length === 0 && (
            <p className="text-center text-gray-500">
              لا توجد حجوزات
            </p>
          )}
        </div>

      </div>
    </div>
  );
}