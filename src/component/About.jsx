import React from "react";
import doctorImg from "../assets/About.png";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function About() {

  const features = [
    "استخدام أحدث الأجهزة الطبية",
    "تشخيص دقيق وخطة علاج متكاملة",
    "متابعة مستمرة للحالة",
  ];

  return (
    <section className="py-28 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">

      {/* background glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 blur-3xl opacity-30 rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-200 blur-3xl opacity-30 rounded-full"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center group"
          >
            {/* glow behind */}
            <div className="absolute w-[70%] h-[90%] bg-gradient-to-r from-blue-500 to-indigo-600 blur-2xl opacity-20 rounded-3xl group-hover:opacity-30 transition"></div>

            <img
              src={doctorImg}
              alt="Doctor"
              className="relative w-[70%] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.2)] object-cover transition duration-500 group-hover:scale-105"
            />

            {/* floating badge */}
            <div className="absolute top-6 right-10 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-md text-sm font-medium">
              ⭐ استشاري أمراض  المخ والأعصاب
            </div>
          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-right"
          >

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              عن{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                د/  اشرف عباس
              </span>
            </h2>

            {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed">
            استشاري جراحة المخ والأعصاب، يتمتع بخبرة طويلة في تشخيص وعلاج أمراض
            الجهاز العصبي باستخدام أحدث التقنيات الطبية الدقيقة، لضمان أفضل رعاية
            ونتائج علاجية للمرضى.
          </p>

            {/* STATS (premium cards) */}
            <div className="grid grid-cols-3 gap-4 pt-2">

              {[
                { num: "10+", label: "سنوات خبرة" },
                { num: "5000+", label: "حالة ناجحة" },
                { num: "100%", label: "رضا المرضى" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/70 backdrop-blur-lg border border-gray-100 p-5 rounded-2xl text-center shadow-sm hover:shadow-xl transition hover:-translate-y-2"
                >
                  <h3 className="text-2xl font-bold text-blue-600">
                    {item.num}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {item.label}
                  </p>
                </div>
              ))}

            </div>

            {/* FEATURES */}
            <div className="space-y-4">

              {features.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white/60 backdrop-blur-lg p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
                >
                  <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full">
                    <Check size={16} />
                  </div>

                  <span className="text-gray-700 font-medium">
                    {item}
                  </span>
                </div>
              ))}

            </div>

            {/* CTA */}
            <div className="pt-4">
              <NavLink
                to="/Booking"
                className="relative inline-block px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg overflow-hidden group"
              >
                <span className="relative z-10">احجز موعد الآن</span>
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition"></span>
              </NavLink>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}