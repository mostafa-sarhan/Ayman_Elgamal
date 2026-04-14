import React from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Send } from "lucide-react";

export default function Contact() {

  const infoCards = [
    {
      icon: <Phone />,
      title: "رقم الهاتف",
      value: "01234567891",
      link: "tel:01234567891"
    },
    {
      icon: <MapPin />,
      title: "العنوان",
      value: "محافظة المنوفية - مركز الشهداء / شارع بورسعيد",
    },
    {
      icon: <Clock />,
      title: "مواعيد العمل",
      value: "يوميًا من 5 مساءً إلى 10 مساءً",
    }
  ];

  return (
    <section className="py-28 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">

      {/* background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-200 blur-3xl opacity-30 rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-200 blur-3xl opacity-30 rounded-full"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            تواصل{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              معنا
            </span>
          </h2>

          <p className="text-gray-500 mt-4">
            احنا دايمًا جاهزين للرد على استفساراتك وحجز مواعيدك
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">

          {/* INFO */}
          <div className="space-y-6">
            {infoCards.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}   // 👈 من تحت لفوق
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.15,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group bg-white/70 backdrop-blur-lg border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 will-change-transform"
              >

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-md group-hover:scale-110 transition">
                    {item.icon}
                  </div>

                  <div className="text-right">
                    <h3 className="text-gray-800 font-semibold">
                      {item.title}
                    </h3>

                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-blue-600 font-bold hover:underline"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.value}
                      </p>
                    )}
                  </div>

                </div>

              </motion.div>
            ))}
          </div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}  // 👈 بدل x → y
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-xl border border-gray-100 p-8 rounded-3xl shadow-2xl will-change-transform"
          >

            <form className="space-y-5 text-right">

              <input
                type="text"
                placeholder="الاسم"
                className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />

              <input
                type="phone"
                placeholder="رقم الهاتف"
                className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />

              <textarea
                rows="5"
                placeholder="اكتب رسالتك..."
                className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
              ></textarea>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition duration-300"
              >
                <Send size={18} />
                إرسال الرسالة
              </button>

            </form>

          </motion.div>

        </div>
      </div>
    </section>
  );
}