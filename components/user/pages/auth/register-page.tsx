"use client";

import RegisterForm from "@/components/user/forms/register-form";

export default function RegisterPage() {
  return (
    <div className="bg-slate-50 grid lg:grid-cols-2 h-screen overflow-hidden">
      
      {/* LEFT SIDE: Visual & Branding */}
      <div className="relative bg-primary hidden lg:flex flex-col justify-center items-center p-12 overflow-hidden">
        {/* Decorative Elements */}
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

          <h1 className="text-4xl font-extrabold text-white mb-4 uppercase tracking-wider">
            AC SEJUK ABADI
          </h1>

          <p className="text-blue-100 text-lg max-w-md leading-relaxed">
            Solusi kenyamanan udara terbaik untuk hunian dan bisnis Anda.
          </p>
        </div>

        <div className="absolute bottom-10 left-12 text-blue-200/40 text-xs">
          © 2026 PT. Sejuk Abadi Teknik
        </div>
      </div>

      {/* RIGHT SIDE: Form Section */}
      <div className="flex flex-col bg-white lg:rounded-l-[40px] shadow-2xl overflow-y-auto">
        <div className="flex justify-center items-start min-h-full py-12 px-6 sm:px-12">
          <div className="w-full max-w-md">

            {/* Mobile Header (Hanya muncul di layar HP) */}
            <div className="lg:hidden text-center mb-8">
              <h2 className="text-2xl font-bold text-primary">AC SEJUK ABADI</h2>
            </div>

            {/* Title Section */}
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Daftar Akun
              </h2>
              <p className="text-slate-500 mt-2 text-sm">
                Buat akun untuk mulai menggunakan sistem layanan AC kami.
              </p>
            </div>

            {/* FORM CONTAINER */}
            <div className="pb-10">
              <RegisterForm />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}