import React, { useEffect, useRef, useState } from "react";

const URL = "https://dr-ayman.onrender.com";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);



  const [readIds, setReadIds] = useState(() => {
    return JSON.parse(localStorage.getItem("readNotifications") || "[]");
  });

  const prevBookingsRef = useRef([]);

  // ================= Fetch Bookings =================
  const fetchBookings = async () => {
    try {
      const res = await fetch(`${URL}/bookings`, {
        headers: getAuthHeaders(),
      });

      const data = await res.json();

      const newBookings = data.bookings || [];
      const oldBookings = prevBookingsRef.current;

      newBookings.forEach((newB) => {
        const oldB = oldBookings.find((b) => b._id === newB._id);

        // 🟢 New booking
        if (!oldB) {
          addNotification(
            `📥 حجز جديد: ${newB.name} - ${newB.time}`,
            newB
          );
        }

        // 🟡 Status change
        else if (oldB.status !== newB.status) {
          if (newB.status === "confirmed") {
            addNotification(
              `✅ تم تأكيد حجز ${newB.name}`,
              newB
            );
          }

          if (newB.status === "cancelled") {
            addNotification(
              `❌ تم إلغاء حجز ${newB.name}`,
              newB
            );
          }

          if (newB.status === "pending") {
            addNotification(
              `⏳ رجوع الحجز لقيد الانتظار ${newB.name}`,
              newB
            );
          }
        }
      });

      prevBookingsRef.current = newBookings;
    } catch (err) {
      console.error(err);
    }
  };

  // ================= Add Notification =================
  const addNotification = (message, booking) => {
    setNotifications((prev) => {
      const exists = prev.some(
        (n) =>
          n.booking?._id === booking?._id &&
          n.message === message
      );

      if (exists) return prev;

      const newNotif = {
        id: crypto.randomUUID(),
        message,
        time: new Date().toLocaleTimeString("ar-EG"),
        booking,
      };

      return [newNotif, ...prev];
    });
  };

  // ================= Mark One As Read =================
  const markAsRead = (id) => {
    setReadIds((prev) => {
      const updated = [...new Set([...prev, id])];
      localStorage.setItem(
        "readNotifications",
        JSON.stringify(updated)
      );
      return updated;
    });
  };

  // ================= Mark All =================
  const markAllAsRead = () => {
    const allIds = notifications.map((n) => n.id);
    setReadIds(allIds);
    localStorage.setItem(
      "readNotifications",
      JSON.stringify(allIds)
    );
  };

  const unreadCount = notifications.filter(
    (n) => !readIds.includes(n.id)
  ).length;

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
  }, []);



  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">

      <h2 className="text-xl font-bold text-center mb-4">
        🔔 الإشعارات
      </h2>

      {unreadCount > 0 && (
        <div className="text-center mb-3">
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
            {unreadCount} إشعار جديد
          </span>

        </div>
      )}

      <button
        onClick={markAllAsRead}
        className="mb-4 text-sm text-blue-600 underline"
      >
        تعليم الكل كمقروء
      </button>

      {/* list */}
      <div className="space-y-3">
        {notifications.map((n) => {
          const isRead = readIds.includes(n.id);

          return (
            <div
              key={n.id}
              onClick={() => {
                setSelectedNotification(n);
                markAsRead(n.id);
              }}
              className={`p-3 rounded-xl border-l-4 cursor-pointer shadow-md
                ${
                  isRead
                    ? "bg-gray-100 border-gray-400"
                    : "bg-white border-blue-500"
                }
              `}
            >
              <p className="font-semibold">{n.message}</p>
              <span className="text-xs text-gray-400">
                {n.time}
              </span>
            </div>
          );
        })}
      </div>

      {/* modal */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl w-full max-w-md">

            <h3 className="font-bold mb-3">
              تفاصيل الحجز
            </h3>

            <p>👤 {selectedNotification.booking?.name}</p>
            <p>📞 {selectedNotification.booking?.phone}</p>
            <p>⏰ {selectedNotification.booking?.time}</p>
            <p>📌 {selectedNotification.booking?.status}</p>

            <button
              onClick={() => setSelectedNotification(null)}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
            >
              إغلاق
            </button>

          </div>
        </div>
      )}
    </div>
  );
}