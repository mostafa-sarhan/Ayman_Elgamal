import React, { useEffect, useState } from "react";
import {
  HiUserGroup,
  HiCalendar,
  HiClipboardList,
  HiBell,
} from "react-icons/hi";

const URL = "https://dr-ayman.onrender.com";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export default function MainDashboard() {
  const [stats, setStats] = useState([
    { title: "المرضى", value: 0, icon: <HiUserGroup />, color: "bg-blue-500" },
    { title: "الحجوزات", value: 0, icon: <HiCalendar />, color: "bg-green-500" },
    { title: "الكشوفات", value: 0, icon: <HiClipboardList />, color: "bg-purple-500" },
    { title: "الإشعارات", value: 0, icon: <HiBell />, color: "bg-red-500" },
  ]);

  const [recentBookings, setRecentBookings] = useState([]);

  // ================= Fetch Dashboard Data =================
  const fetchDashboard = async () => {
    try {
      const [patientsRes, bookingsRes] = await Promise.all([
        fetch(`${URL}/patients`, { headers: getAuthHeaders() }),
        fetch(`${URL}/bookings`, { headers: getAuthHeaders() }),
      ]);

      const patientsData = await patientsRes.json();
      const bookingsData = await bookingsRes.json();

      const patients = patientsData.patients || [];
      const bookings = bookingsData.bookings || [];

      // آخر 5 حجوزات
      const lastBookings = bookings.slice(-5).reverse();

      setRecentBookings(lastBookings);

      // stats
      setStats([
        {
          title: "المرضى",
          value: patients.length,
          icon: <HiUserGroup />,
          color: "bg-blue-500",
        },
        {
          title: "الحجوزات",
          value: bookings.length,
          icon: <HiCalendar />,
          color: "bg-green-500",
        },
        {
          title: "الكشوفات",
          value: bookings.filter((b) => b.status === "confirmed").length,
          icon: <HiClipboardList />,
          color: "bg-purple-500",
        },
        {
          title: "الإشعارات",
          value: bookings.filter((b) => b.status !== "pending").length,
          icon: <HiBell />,
          color: "bg-red-500",
        },
      ]);
    } catch (err) {
      console.error("Dashboard error:", err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          👨‍⚕️ لوحة التحكم
        </h1>
        <p className="text-gray-500">
          أهلاً بيك في نظام إدارة العيادة
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between hover:shadow-lg transition"
          >
            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>
              <h2 className="text-2xl font-bold">{item.value}</h2>
            </div>

            <div className={`${item.color} text-white p-3 rounded-full text-xl`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Recent Bookings */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="font-bold mb-3">آخر الحجوزات</h3>

          <ul className="space-y-3 text-sm">
            {recentBookings.map((b) => (
              <li key={b._id} className="flex justify-between border-b pb-2">
                <span>{b.name}</span>
                <span className="text-gray-500">{b.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="font-bold mb-3">إجراءات سريعة</h3>

          <div className="grid grid-cols-2 gap-3">
            <button className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
              إضافة مريض
            </button>

            <button className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition">
              حجز جديد
            </button>

            <button className="bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition">
              كشف جديد
            </button>

            <button className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition">
              الإشعارات
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}