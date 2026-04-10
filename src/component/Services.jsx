import React from 'react'
import service11 from "../assets/service11.png";
import service22 from "../assets/service22.png";
import service33 from "../assets/service333.png";

export default function Services() {
  return (
    <div>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-gray-800">
            خدماتنا
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Service 1 */}
            <div className="bg-white p-2 rounded-xl shadow-lg hover:shadow-2xl transition">
              <img src={service11} alt="Service 1" className="mx-auto mb-6 rounded-xl " />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">تشخيص أمراض الكبد</h3>
              <p className="text-gray-600 ">
                نقدم أحدث الطرق لتشخيص أمراض الكبد بدقة وسرعة مع متابعة مستمرة.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-2 rounded-xl shadow-lg hover:shadow-2xl transition">
              <img src={service22} alt="Service 2" className="mx-auto mb-6 rounded-xl " />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">مناظير الجهاز الهضمي</h3>
              <p className="text-gray-600">
                إجراء مناظير الجهاز الهضمي بأعلى درجات الأمان والتقنية الحديثة.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-2 cursor-pointer rounded-xl shadow-lg hover:shadow-2xl transition">
              <img src={service33} alt="Service 3" className="mx-auto mb-6 rounded-xl " />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">استشارات طبية متخصصة</h3>
              <p className="text-gray-600">
                جلسات استشارة متخصصة لمتابعة الحالات الصحية مع نصائح دقيقة وعملية.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
