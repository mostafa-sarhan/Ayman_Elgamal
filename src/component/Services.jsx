import React from 'react'
import { motion } from "framer-motion";
import service1 from "../assets/services1.png";
import service2 from "../assets/services2.png";
import service3 from "../assets/services3.png";

const services = [
  {
    img: service1,
    title: "تشخيص أمراض المخ والأعصاب",
    desc: "تشخيص دقيق لحالات المخ والأعصاب باستخدام أحدث التقنيات الطبية.",
  },
  {
    img: service2,
    title: "جراحات المخ والأعصاب",
    desc: "إجراء جراحات دقيقة وآمنة باستخدام أحدث الأساليب الجراحية.",
  },
  {
    img: service3,
    title: "استشارات طبية متخصصة",
    desc: "متابعة دقيقة للحالات ووضع خطط علاجية مناسبة لكل مريض.",
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 inline-block">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              خدماتنا
            </span>

            <span className="block h-1 w-24 mx-auto mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></span>
          </h2>

          <p className="text-gray-500 max-w-xl mx-auto">
            خدمات طبية متكاملة بأحدث التقنيات لضمان أفضل تجربة علاجية.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}   // 👈 زي التايتل بس أقوى شوية
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15, // 👈 stagger manual أنعم
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 overflow-hidden flex flex-col will-change-transform"
            >

              {/* Image */}
              <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                  src={item.img}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">

                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-blue-600 transition">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed flex-grow">
                  {item.desc}
                </p>

                <button className="mt-6 self-start px-5 py-2 rounded-lg bg-gray-900 text-white text-sm hover:bg-blue-600 transition duration-300">
                  اعرف أكثر
                </button>

              </div>
            </motion.div>

          ))}
        </div>

      </div>
    </section>
  )
}