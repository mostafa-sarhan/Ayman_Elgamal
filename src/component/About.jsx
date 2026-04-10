import React from "react";
import doctorImg from "../assets/ayman21.jpg";
import { NavLink } from "react-router-dom";

export default function About() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

          {/* Image */}
          <div className="relative w-full flex justify-center items-center">
            <img
              src={doctorImg}
              alt="Doctor"
              className="w-[65%] rounded-3xl shadow-2xl object-cover"
            />

            {/* Decoration */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl"></div>
          </div>

          {/* Content */}
          <div className="space-y-6 text-right">

            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
              عن <span className="text-blue-600">د/ أيمن الجمل</span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              استشاري أمراض الكبد والجهاز الهضمي ومناظير الجهاز الهضمي،
              يتمتع بخبرة طويلة في تشخيص وعلاج الحالات المختلفة باستخدام
              أحدث التقنيات الطبية لضمان أفضل رعاية للمرضى.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">

              <div className="bg-white p-4 rounded-xl shadow text-center">
                <h3 className="text-2xl font-bold text-blue-600">10+</h3>
                <p className="text-gray-500 text-sm">سنوات خبرة</p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow text-center">
                <h3 className="text-2xl font-bold text-blue-600">5000+</h3>
                <p className="text-gray-500 text-sm">حالة ناجحة</p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow text-center">
                <h3 className="text-2xl font-bold text-blue-600">100%</h3>
                <p className="text-gray-500 text-sm">رضا المرضى</p>
              </div>

            </div>

            {/* Features */}
            <div className="space-y-3 pt-4">

              <div className="flex items-center gap-3 justify-start">
                <span className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full">
                  ✓
                </span>
                <span className="text-gray-700">
                  استخدام أحدث الأجهزة الطبية
                </span>
              </div>

              <div className="flex items-center gap-3 justify-start">
                <span className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full">
                  ✓
                </span>
                <span className="text-gray-700">
                  تشخيص دقيق وخطة علاج متكاملة
                </span>
              </div>

              <div className="flex items-center gap-3 justify-start">
                <span className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full">
                  ✓
                </span>
                <span className="text-gray-700">
                  متابعة مستمرة للحالة
                </span>
              </div>

            </div>

            {/* CTA */}
            <div className="pt-6">
              <NavLink
                to="/Booking"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
              >
                احجز موعد الآن
              </NavLink>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}