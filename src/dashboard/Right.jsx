import {
  FaCalendarAlt,
  FaClipboardList,
  FaUserInjured,
  FaBell,
  FaUser,
  FaCog,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function Right() {
  const location = useLocation();

  const menu = [
    {
      id: "schedule",
      label: "جدول المواعيد",
      path: "/dashboard/schedule",
      icon: <FaCalendarAlt />,
    },
    {
      id: "bookings",
      label: "الحجوزات",
      path: "/dashboard/bookings",
      icon: <FaClipboardList />,
    },
    {
      id: "booktoday",
      label: "الحجوزات اليوم",
      path: "/dashboard/booktoday",
      icon: <FaClipboardList />,
    },
    {
      id: "patients",
      label: "المرضى",
      path: "/dashboard/patients",
      icon: <FaUserInjured />,
    },
    {
      id: "notifications",
      label: "الإشعارات",
      path: "/dashboard/notifications",
      icon: <FaBell />,
    },
    {
      id: "settings",
      label: "الإعدادات",
      path: "/dashboard/settings",
      icon: <FaCog />,
    },
  ];

  // ✅ initial من localStorage
  const [unreadCount, setUnreadCount] = useState(() => {
    return Number(localStorage.getItem("unreadCount") || 0);
  });

  useEffect(() => {
    // ✅ function بتحدث القيمة
    const updateUnread = () => {
      const value = Number(localStorage.getItem("unreadCount") || 0);
      setUnreadCount(value);
    };

    // ✅ اسمع للـ custom event
    window.addEventListener("notificationsUpdated", updateUnread);

    // ✅ اسمع لو localStorage اتغير من تاب تاني
    window.addEventListener("storage", updateUnread);

    return () => {
      window.removeEventListener("notificationsUpdated", updateUnread);
      window.removeEventListener("storage", updateUnread);
    };
  }, []);

  return (
    <div className="p-6 space-y-4 bg-gray-900 min-h-screen">
      <h2 className="text-xl font-bold mb-4 text-white">لوحة الإدارة</h2>

      <ul className="space-y-2">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`flex items-center justify-between p-3 rounded-md transition
                ${
                  isActive
                    ? "bg-gray-700 font-semibold text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {/* left side */}
                <div className="flex items-center gap-3">
                  <span
                    className={`text-lg ${
                      isActive ? "text-yellow-400" : ""
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span>{item.label}</span>
                </div>

                {/* 🔔 badge للإشعارات */}
                {item.id === "notifications" && unreadCount > 0 && (
                  <span className="bg-red-600 text-white text-xs min-w-5 h-5 px-1 flex items-center justify-center rounded-full animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}