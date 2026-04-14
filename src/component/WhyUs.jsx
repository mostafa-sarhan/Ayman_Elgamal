import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { NavLink } from "react-router-dom";
import why from "../assets/whyUs.png";


export default function WhyUs() {

const features = [
  "خبرة أكثر من 10 سنوات",
  "أحدث التقنيات الجراحية",
  "متابعة دقيقة للحالات",
  "تشخيص وعلاج دقيق",
];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">

      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-200 opacity-30 blur-3xl rounded-full"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative group flex justify-center"
          >
            {/* glow */}
            <div className="absolute w-[85%] h-[85%] bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition"></div>

            <img
              src={why}
              alt="Doctor"
              className="relative w-[80%] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] object-cover transition duration-500 group-hover:scale-105"
            />

            {/* badge */}
            <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-md text-sm font-medium text-gray-800">
              ⭐ خبرة +10 سنوات
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="space-y-8 text-right"
          >

            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              لماذا تختار{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                د/  اشرف عباس ؟
              </span>
            </h2>

            {/* Description */}
                <p className="text-gray-600 text-lg leading-relaxed">
                نوفر رعاية طبية متقدمة في جراحة المخ والأعصاب، معتمدين على أحدث التقنيات العالمية،
                وخبرة طويلة في تشخيص وعلاج أدق الحالات العصبية والجراحية، لتحقيق أعلى مستويات الدقة والأمان للمريض.
                </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="group flex items-center gap-4 bg-white/70 backdrop-blur-lg border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-md group-hover:scale-110 transition">
                    <Check size={18} />
                  </div>

                  <span className="text-gray-800 font-medium group-hover:text-blue-600 transition">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Button */}
            <div className="pt-6">
              <NavLink
                to="/Booking"
                className="inline-block px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                احجز استشارة الآن
              </NavLink>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}