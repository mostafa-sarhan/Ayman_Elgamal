import React, { useState } from "react";
import Left from "./Left";
import Right from "./Right";
import { HiMenu } from "react-icons/hi";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 right-0 z-40 w-80 bg-gray-900 text-white transform
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0 py-16" : "translate-x-full"}
          md:relative md:translate-x-0 md:shrink-0
        `}
      >
        <div className="px-4 py-6 md:py-8">
          <Right />
        </div>
      </div>

      {/* Overlay على الموبايل */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Top bar على الموبايل فقط */}
        <div className="flex items-center justify-between bg-white shadow-md px-6 py-4 md:hidden">
          <button
            className="text-2xl text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <HiMenu />
          </button>
          <h2 className="text-xl font-bold text-gray-800">لوحة التحكم</h2>
          <div></div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-0 md:p-6 w-full">
          <Left />
        </main>
      </div>
    </div>
  );
}