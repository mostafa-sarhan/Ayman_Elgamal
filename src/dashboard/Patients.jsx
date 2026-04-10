import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const URL = "https://dr-ayman.onrender.com";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchPhone, setSearchPhone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await fetch(`${URL}/patients`, {
        headers: getAuthHeaders(),
      });

      const data = await res.json();
      setPatients(data.patients || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // فلترة المرضى
  const filteredPatients = patients.filter((p) =>
    p.phone.includes(searchPhone)
  );

  if (loading)
    return (
      <p className="text-center mt-4 text-gray-600">
        جاري التحميل...
      </p>
    );

  return (
    <div className="space-y-6 font-sans px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        كشف المرضى
      </h2>

      {/* Search Input */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="ابحث برقم الهاتف..."
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="overflow-x-auto">

        {/* Desktop Table */}
        <table className="hidden md:table min-w-full bg-white shadow-md rounded-lg text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-right">الاسم</th>
              <th className="p-3 text-right">الهاتف</th>
              <th className="p-3 text-right">السن</th>
              <th className="p-3 text-right">النوع</th>
              <th className="p-3 text-center">الإجراء</th>
            </tr>
          </thead>

          <tbody>
            {filteredPatients.map((p) => (
              <tr key={p._id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-right">{p.name}</td>
                <td className="p-3 text-right">{p.phone}</td>
                <td className="p-3 text-right">{p.age || "-"}</td>
                <td className="p-3 text-right">{p.gender || "-"}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() =>
                      navigate(`/patients/${p.phone}/details`)
                    }
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                  >
                    عرض التفاصيل
                  </button>
                </td>
              </tr>
            ))}

            {filteredPatients.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-4 text-gray-500"
                >
                  لا يوجد مرضى
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredPatients.map((p) => (
            <div
              key={p._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col space-y-2"
            >
              <div className="flex justify-between">
                <span className="font-semibold">
                  الاسم: {p.name}
                </span>
                <span className="text-gray-500">
                  الهاتف: {p.phone}
                </span>
              </div>

              <div className="flex justify-between text-gray-500 text-sm">
                <span>السن: {p.age || "-"}</span>
                <span>النوع: {p.gender || "-"}</span>
              </div>

              <button
                onClick={() =>
                  navigate(`/patients/${p.phone}/details`)
                }
                className="mt-2 bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
              >
                عرض التفاصيل
              </button>
            </div>
          ))}

          {filteredPatients.length === 0 && (
            <p className="text-center text-gray-500">
              لا يوجد مرضى
            </p>
          )}
        </div>

      </div>
    </div>
  );
}