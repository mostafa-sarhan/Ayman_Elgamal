import React from "react";
// import bgImage from "../assets/bgAyman.png";
// import bgImage11 from "../assets/drAyman11.png";
import bgImage33 from "../assets/drAyman33.png";

import chosen from "../assets/chosen1.png";
import Services from "./Services";
import { NavLink } from "react-router-dom";


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
              د/ أيمن الجمل
            </h2>
            <p className="text-lg md:text-2xl text-gray-200 leading-relaxed">
              استشاري أمراض الكبد والجهاز الهضمي، ومناظير الجهاز الهضمي كليه الطب جامعه المنوفيه
            </p>

            <div className="flex justify-start gap-4 flex-wrap">
              <NavLink
                to="/Booking"
                className="bg-blue-600 cursor-pointer hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
              >
                احجز الآن
              </NavLink>

              <NavLink
                to="/About"
                className="border cursor-pointer border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition"
              >
                اعرف المزيد
              </NavLink>
            </div>

          </div>

        </div>
      </section>
      <Services/>
{/* Section 3: Why Choose Us */}
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Image */}
          <div className="relative">
            <div className="flex justify-center" >
              <img
              src={chosen}
              alt="Doctor"
              className="w-[80%] rounded-3xl shadow-2xl"
            />
            </div>

            {/* Decorative Shape */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl"></div>
          </div>

          {/* Content */}
          <div className="space-y-6 text-right">

            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
              لماذا تختار <span className="text-blue-600">د/ أيمن الجمل ؟</span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              نقدم رعاية طبية متكاملة باستخدام أحدث الأجهزة والتقنيات الحديثة،
              مع خبرة طويلة في تشخيص وعلاج أمراض الكبد والجهاز الهضمي بدقة واحترافية.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">

              {[
                "خبرة أكثر من 10 سنوات",
                "أحدث أجهزة المناظير",
                "متابعة مستمرة للحالات",
                "دقة في التشخيص والعلاج",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full text-lg">
                    ✓
                  </div>

                  <span className="text-gray-700 font-medium">
                    {item}
                  </span>
                </div>
              ))}

            </div>

            {/* Button */}
            <div className="pt-6">
              <NavLink
                to="/Booking"
                className="inline-block bg-blue-600 hover:bg-white  text-white hover:text-blue-700 hover:border hover:border-blue-700 px-8  py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                احجز استشارة الآن
              </NavLink>
            </div>

          </div>

        </div>
      </div>
    </section>


    <section className="py-20 bg-linear-to-r from-blue-600 to-blue-700 text-white">
      <div className="container mx-auto px-6 md:px-12">

        <div className="grid  items-center">


          <div className="space-y-6 text-center">

            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              احجز موعدك الآن مع <br />
              <span className="text-yellow-300">د/ أيمن الجمل</span>
            </h2>

            <p className="text-lg text-blue-100 leading-relaxed">
              احصل على استشارة طبية دقيقة باستخدام أحدث التقنيات،
              واحجز موعدك بسهولة في دقائق قليلة.
            </p>

            <div className="flex gap-4 flex-wrap justify-center">
              <NavLink
                to="/Booking"
                className="bg-white text-blue-700 px-8 py-3  rounded-xl font-semibold hover:bg-blue-700 hover:text-white hover:border hover:border-white transition shadow-lg"
              >
                احجز الآن
              </NavLink>

              <NavLink
                to="/Contact"
                className="border border-white px-8 py-3 rounded-xl hover:bg-white hover:text-blue-700 transition"
              >
                تواصل معنا
              </NavLink>
            </div>

          </div>




        </div>

      </div>
    </section>







    </div>






  );
}