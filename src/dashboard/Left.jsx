import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Schedule from "./Schedule";
import Bookings from "./Bookings";
import Patients from "./Patients";
import Notifications from "./Notifications";
import Profiling from "./Profiling";
import Setting from "./Setting";
import BookToday from "./BookToday";
import MainDashboard from "./MainDashboard";
export default function Left() {
  return (
    <div className=" p-6 min-h-screen bg-gray-100">
      <Routes>
        {/* redirect من /dashboard */}
        <Route path="/" element={<MainDashboard />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="patients" element={<Patients />} />
        <Route path="notifications" element={<Notifications/>} />
        <Route path="profile" element={<Profiling/>} />
        <Route path="settings" element={<Setting/>} />
        <Route path="booktoday" element={<BookToday/>} />
      </Routes>
    </div>
  );
}