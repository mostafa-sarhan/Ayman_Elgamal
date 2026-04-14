import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `relative group font-medium transition-all duration-300
    ${isActive ? "text-blue-700" : "text-gray-700 hover:text-blue-600"}`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-sm">

      <div className="container mx-auto flex items-center justify-between px-6 h-20">

        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent tracking-tight hover:scale-105 transition"
        >
          د/ أشرف عباس
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-[17px]">

          {[
            { name: "الرئيسية", path: "/" },
            { name: "عن الدكتور", path: "/About" },
            { name: "الخدمات", path: "/Services" },
            { name: "حجز موعد", path: "/Booking" },
            { name: "تواصل معنا", path: "/Contact" },
          ].map((link, index) => (
            <NavLink key={index} to={link.path} className={linkClass}>

              {/* Text */}
              <span>{link.name}</span>

              {/* Premium underline */}
              <span className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>

            </NavLink>
          ))}

        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <NavLink
            to="/Booking"
            className="relative px-6 py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 shadow-lg overflow-hidden group transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">احجز الآن</span>

            {/* shine effect */}
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition"></span>
          </NavLink>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700"
        >
          <div className="w-6 h-6 relative">
            <span className={`absolute w-6 h-0.5 bg-gray-700 transition ${isOpen ? "rotate-45 top-3" : "top-1"}`}></span>
            <span className={`absolute w-6 h-0.5 bg-gray-700 top-3 transition ${isOpen ? "opacity-0" : ""}`}></span>
            <span className={`absolute w-6 h-0.5 bg-gray-700 transition ${isOpen ? "-rotate-45 top-3" : "top-5"}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 bg-white border-t border-gray-100 ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 p-6 text-gray-700">

          {[
            { name: "الرئيسية", path: "/" },
            { name: "عن الدكتور", path: "/About" },
            { name: "الخدمات", path: "/Services" },
            { name: "حجز موعد", path: "/Booking" },
            { name: "تواصل معنا", path: "/Contact" },
          ].map((link, index) => (
            <NavLink
              key={index}
              onClick={() => setIsOpen(false)}
              to={link.path}
              className="hover:text-blue-600 transition"
            >
              {link.name}
            </NavLink>
          ))}

          <NavLink
            onClick={() => setIsOpen(false)}
            to="/Booking"
            className="mt-2 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-xl shadow-md"
          >
            احجز الآن
          </NavLink>

        </div>
      </div>

    </nav>
  );
}