import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="h-20 bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-6 h-full">

        {/* Doctor Name */}

        <NavLink to="/" className="text-2xl cursor-pointer md:text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors ml-a">
          د/ أيمن الجمل
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-lg md:text-xl items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600 transition-colors"
            }
          >
            الرئيسية
          </NavLink>
          <NavLink
            to="/About"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600 transition-colors"
            }
          >
            عن الدكتور
          </NavLink>
          <NavLink
            to="/Services"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600 transition-colors"
            }
          >
            الخدمات
          </NavLink>
          <NavLink
            to="/Booking"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600 transition-colors"
            }
          >
            حجز موعد
          </NavLink>
          <NavLink
            to="/Contact"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600 transition-colors"
            }
          >
            تواصل معنا
          </NavLink>

          {/* CTA Button */}


        </div>
        {/* احجز الآن */}
          <div className="hidden md:flex  gap-8 text-lg md:text-xl items-center cursor-pointer">
            <NavLink
              to="/Booking"
              className=" bg-blue-600  text-white px-6 py-2 rounded-xl hover:bg-white border border-2 border-blue-600 hover:text-blue-600 shadow-md transition-all duration-300"
            >
              احجز الآن
            </NavLink>

          </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-2xl flex items-center text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-md  w-full flex flex-col gap-4 text-lg transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}>
        <NavLink onClick={() => setIsOpen(false)} className="text-gray-700 px-4 hover:text-blue-600 transition" to="/">
          الرئيسية
        </NavLink>
        <NavLink onClick={() => setIsOpen(false)} className="text-gray-700 px-4 hover:text-blue-600 transition" to="/About">
          عن الدكتور
        </NavLink>
        <NavLink onClick={() => setIsOpen(false)} className="text-gray-700 px-4 hover:text-blue-600 transition" to="/Services">
          الخدمات
        </NavLink>
        <NavLink onClick={() => setIsOpen(false)} className="text-gray-700 px-4 hover:text-blue-600 transition" to="/Booking">
          حجز موعد
        </NavLink>
        <NavLink onClick={() => setIsOpen(false)} className="text-gray-700 px-4 hover:text-blue-600 transition" to="/Contact">
          تواصل معنا
        </NavLink>
        <NavLink
          onClick={() => setIsOpen(false)}
          className="bg-blue-600 text-center text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          to="/Booking"
        >
          احجز الآن
        </NavLink>
      </div>
    </nav>
  );
}