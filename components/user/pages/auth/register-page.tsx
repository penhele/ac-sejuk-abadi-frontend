"use client";

import { useState } from "react";
import RegisterForm from "@/components/user/forms/register-form";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data: any) => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Register gagal");
        return;
      }

      alert("Register berhasil!");
      window.location.href = "/login";

    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan pada server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 grid lg:grid-cols-2 h-screen overflow-hidden">

      {/* LEFT SIDE */}
      <div className="relative bg-primary hidden lg:flex flex-col justify-center items-center p-12 overflow-hidden">
        
        {/* Background effect */}
        <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-6 bg-white p-4 rounded-2xl shadow-xl">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-20 object-contain"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>

          <h1 className="text-4xl font-extrabold text-white mb-4 uppercase">
            AC SEJUK ABADI
          </h1>

          <p className="text-blue-100 text-lg max-w-md">
            Solusi kenyamanan udara terbaik untuk hunian dan bisnis Anda.
          </p>
        </div>

        <div className="absolute bottom-10 left-12 text-blue-200/40 text-xs">
          © 2026 PT. Sejuk Abadi Teknik
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-center items-center p-6 sm:p-12 bg-white lg:rounded-l-[40px] overflow-y-auto">
        <div className="w-full max-w-md">

          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-6">
            <h2 className="text-xl font-bold">AC SEJUK ABADI</h2>
          </div>

          {/* Title */}
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Daftar Akun
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Buat akun untuk mulai menggunakan sistem
            </p>
          </div>

          {/* FORM */}
          <RegisterForm 
            onSubmit={handleRegister} 
            loading={loading} // 🔥 kirim ke form
          />

        </div>
      </div>
    </div>
  );
}