import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import Right from "./Right";

const URL = "https://dr-ayman.onrender.com";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export default function VisitPage() {
  const { phone } = useParams();
  const navigate = useNavigate();

  const [selected, setSelected] = useState("patients");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState(null);

  const [visitData, setVisitData] = useState({
    type: "كشف",
    complaint: "",
    diagnosis: "",
    treatment: "",
    notes: "",
  });

  useEffect(() => {
    fetchPatient();
  }, [phone]);

  const fetchPatient = async () => {
    try {
      const res = await fetch(
        `${URL}/patients/${phone}/history`,
        {
          headers: getAuthHeaders(),
        }
      );

      const data = await res.json();
      setPatient(data.patient);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setVisitData({
      ...visitData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveVisit = async () => {
    try {
      await fetch(`${URL}/patients/${phone}/visit`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(visitData),
      });

      alert("تم حفظ الكشف بنجاح!");

      // إعادة تحميل البيانات بعد الحفظ
      fetchPatient();
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء الحفظ");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-4 text-gray-600">
        جاري التحميل...
      </p>
    );

  if (!patient)
    return (
      <p className="text-center mt-4 text-red-500">
        المريض غير موجود
      </p>
    );

  return (
    <div className="flex h-screen overflow-hidden font-sans">

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-80 bg-gray-900 text-white transform
        transition-transform duration-300 ease-in-out
        ${
          sidebarOpen
            ? "translate-x-0 py-16"
            : "translate-x-full"
        }
        md:relative md:translate-x-0 md:shrink-0`}
      >
        <div className="px-4 py-6 md:py-8">
          <Right
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col m-2 md:m-10 rounded-2xl bg-gray-100 overflow-y-auto">

        {/* Mobile top bar */}
        <div className="flex items-center justify-between bg-white shadow-md px-6 py-4 md:hidden">
          <button
            className="text-2xl text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <HiMenu />
          </button>

          <h2 className="text-xl font-bold text-gray-800">
            كشف المريض
          </h2>

          <div />
        </div>

        <main className="flex-1 p-6 space-y-6">

          {/* Patient info */}
          <div className="bg-gray-100 p-5 rounded shadow-md space-y-2">
            <p>
              <strong>الاسم:</strong> {patient.name}
            </p>
            <p>
              <strong>الهاتف:</strong> {patient.phone}
            </p>
            <p>
              <strong>السن:</strong> {patient.age || "-"}
            </p>
            <p>
              <strong>النوع:</strong> {patient.gender || "-"}
            </p>
          </div>

          {/* Form */}
          <div className="bg-white p-6 rounded shadow-md space-y-4">

            <div>
              <label className="block font-semibold mb-1">
                نوع الزيارة:
              </label>

              <select
                name="type"
                value={visitData.type}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="كشف">كشف</option>
                <option value="متابعة">متابعة</option>
                <option value="استشارة">استشارة</option>
              </select>
            </div>

            {[
              "complaint",
              "diagnosis",
              "treatment",
              "notes",
            ].map((field) => (
              <div key={field}>
                <label className="block font-semibold mb-1">
                  {field === "complaint"
                    ? "الشكوى"
                    : field === "diagnosis"
                    ? "التشخيص"
                    : field === "treatment"
                    ? "العلاج"
                    : "ملاحظات"}
                  :
                </label>

                <textarea
                  name={field}
                  value={visitData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}

            <button
              onClick={handleSaveVisit}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              حفظ الكشف
            </button>
          </div>

          {/* Previous visits */}
          {patient.visits?.length > 0 && (
            <div className="space-y-4">

              <h3 className="font-bold text-lg">
                الزيارات السابقة:
              </h3>

              {/* Desktop */}
              <div className="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      {[
                        "التاريخ",
                        "نوع الزيارة",
                        "الشكوى",
                        "التشخيص",
                        "العلاج",
                        "ملاحظات",
                      ].map((h, i) => (
                        <th
                          key={i}
                          className="py-2 px-4 text-center"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {patient.visits.map((v, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50"
                      >
                        <td className="py-2 px-4 text-center">
                          {v.date}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {v.type}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {v.complaint || "-"}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {v.diagnosis || "-"}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {v.treatment || "-"}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {v.notes || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile */}
              <div className="md:hidden space-y-4">
                {patient.visits.map((v, idx) => (
                  <div
                    key={idx}
                    className="bg-white shadow-md rounded-lg p-4"
                  >
                    <div className="flex justify-between">
                      <span className="font-semibold">
                        {v.date}
                      </span>
                      <span className="text-gray-500">
                        {v.type}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600">
                      <p>
                        <strong>الشكوى:</strong>{" "}
                        {v.complaint || "-"}
                      </p>
                      <p>
                        <strong>التشخيص:</strong>{" "}
                        {v.diagnosis || "-"}
                      </p>
                      <p>
                        <strong>العلاج:</strong>{" "}
                        {v.treatment || "-"}
                      </p>
                      <p>
                        <strong>ملاحظات:</strong>{" "}
                        {v.notes || "-"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}