import React from "react";

export default function Contact() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            تواصل معنا
          </h2>
          <p className="text-gray-500 mt-4">
            احنا دايمًا جاهزين للرد على استفساراتك وحجز مواعيدك
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Contact Info */}
          <div className="space-y-6 text-right">

            {/* Phone */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                📞 رقم الهاتف
              </h3>
              <a
                href="tel:01017894631"
                className="text-blue-600 text-lg font-bold"
              >
                01234567891
              </a>
            </div>

            {/* Address */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                📍 العنوان
              </h3>
              <p className="text-gray-600 leading-relaxed">
                محافظة المنوفية - مركز تلا <br />
                شارع الحرية أعلى صيدلية الشعب
              </p>
            </div>

            {/* Working Hours */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                ⏰ مواعيد العمل
              </h3>
              <p className="text-gray-600">
                يوميًا من 5 مساءً إلى 10 مساءً
              </p>
            </div>

          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl">

            <form className="space-y-5">

              <input
                type="text"
                placeholder="الاسم"
                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />

              <input
                type="tel"
                placeholder="رقم الهاتف"
                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />

              <textarea
                rows="4"
                placeholder="اكتب رسالتك..."
                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                إرسال الرسالة
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}