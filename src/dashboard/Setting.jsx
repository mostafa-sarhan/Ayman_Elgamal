import React, { useState, useEffect } from "react";

export default function Setting() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
  });

  // ✅ تحميل البيانات من localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userData"));
    if (savedUser) {
      setForm((prev) => ({
        ...prev,
        name: savedUser.name || "",
        email: savedUser.email || "",
      }));
    }
  }, []);

  // ✅ تحديث الفورم
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ حفظ البيانات
  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: form.name,
      email: form.email,
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    alert("✅ تم حفظ التعديلات بنجاح");

    // reset passwords
    setForm((prev) => ({
      ...prev,
      password: "",
      newPassword: "",
    }));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        ⚙️ إعدادات الحساب
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-4"
      >
        {/* name */}
        <div>
          <label className="block mb-1 font-medium">الاسم</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="ادخل اسمك"
          />
        </div>

        {/* email */}
        <div>
          <label className="block mb-1 font-medium">الإيميل</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="example@email.com"
          />
        </div>

        {/* current password */}
        <div>
          <label className="block mb-1 font-medium">كلمة المرور الحالية</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            placeholder="••••••"
          />
        </div>

        {/* new password */}
        <div>
          <label className="block mb-1 font-medium">كلمة المرور الجديدة</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            placeholder="••••••"
          />
        </div>

        {/* submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          💾 حفظ التعديلات
        </button>
      </form>
    </div>
  );
}