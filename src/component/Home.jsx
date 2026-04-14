import React from "react";
import bgImage33 from "../assets/Ashraf3.png";
import { motion } from "framer-motion";
import Services from "./Services";
import { NavLink } from "react-router-dom";
import WhyUs from "./WhyUs";


export default function Home() {
  return (
    <div className="w-full">
      <section
        className="relative min-h-[calc(100vh-5rem)] flex items-center text-white
                  bg-cover bg-no-repeat
                  bg-position-[18%_center] md:bg-center"
        style={{
          backgroundImage: `url(${bgImage33})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-l from-gray-900/60 via-black/20 to-transparent pointer-events-none"></div>
        {/* Content */}
        <div className="relative z-10  w-full px-6 md:px-12 flex justify-start">

          <div className="max-w-xl  space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              د/ اشرف عباس
            </h2>
            <p className="text-lg md:text-2xl text-gray-200 leading-relaxed">
              دكتوراه واستشاري جراحه المخ والأعصاب والعمود الفقري
              مستشفى جراحه المخ والأعصاب ب شبين الكوم
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-start gap-4 flex-wrap"
          >

            {/* PRIMARY BUTTON */}
            <NavLink
              to="/Booking"
              className="relative group px-7 py-3 rounded-xl font-semibold text-white overflow-hidden"
            >

              {/* gradient background */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"></span>

              {/* shine animation */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>

              {/* glow border */}
              <span className="absolute inset-0 rounded-xl ring-1 ring-white/20 group-hover:ring-white/40 transition"></span>

              {/* hover lift */}
              <span className="relative z-10 group-hover:scale-105 transition duration-300 inline-block">
                احجز الآن
              </span>

            </NavLink>

            {/* SECONDARY BUTTON */}
            <NavLink
              to="/About"
              className="relative group px-7 py-3 rounded-xl font-semibold text-white border border-white/40 backdrop-blur-md overflow-hidden"
            >

              {/* background fill on hover */}
              <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>

              {/* glow */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white blur-xl transition"></span>

              {/* text */}
              <span className="relative z-10 group-hover:text-black transition">
                اعرف المزيد
              </span>

            </NavLink>

          </motion.div>
          </div>
        </div>
      </section>

{/* Section 2: Services */}
      <Services/>
{/* Section 3: Why Choose Us */}
      <WhyUs/>

    <section className="relative py-24 overflow-hidden text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700">

      {/* background glow */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-white/10 blur-3xl rounded-full"></div>

      {/* floating shapes */}
      <div className="absolute top-10 left-1/3 w-4 h-4 bg-white/40 rounded-full animate-pulse"></div>
      <div className="absolute bottom-16 right-1/3 w-3 h-3 bg-white/30 rounded-full animate-bounce"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        <div className="text-center space-y-8 max-w-3xl mx-auto">

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold leading-tight"
          >
            احجز موعدك الآن مع <br />
            <span className="text-yellow-300 drop-shadow-md">
              د/  اشرف عباس
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-blue-100 leading-relaxed"
          >
            احصل على استشارة طبية دقيقة باستخدام أحدث التقنيات،
            واحجز موعدك بسهولة في دقائق قليلة.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4 flex-wrap justify-center"
          >

            {/* PRIMARY */}
            <NavLink
              to="/Booking"
              className="relative group px-8 py-3 rounded-xl font-semibold text-blue-700 bg-white overflow-hidden shadow-xl"
            >

              {/* shine effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 bg-gradient-to-r from-transparent via-blue-200/40 to-transparent"></span>

              {/* hover lift */}
              <span className="relative z-10 group-hover:scale-105 transition inline-block">
                احجز الآن
              </span>
            </NavLink>

            {/* SECONDARY */}
            <NavLink
              to="/Contact"
              className="relative group px-8 py-3 rounded-xl font-semibold border border-white/60 overflow-hidden"
            >

              {/* fill effect */}
              <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>

              {/* glow */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white blur-xl transition"></span>

              <span className="relative z-10 group-hover:text-blue-700 transition">
                تواصل معنا
              </span>

            </NavLink>

          </motion.div>

        </div>
      </div>
    </section>



    </div>

  );
}