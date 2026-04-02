"use client";

import { ForgotPasswordForm } from "@/components/user/forms/forgot-password-form";
import { Snowflake, ThermometerSnowflake } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="bg-slate-50 grid lg:grid-cols-2 gap-0 h-screen overflow-hidden">
      
      {/* SISI KIRI: Branding Section (Identik dengan Login) */}
      <div className="relative bg-primary w-full h-full hidden lg:flex flex-col justify-center items-center p-12 overflow-hidden">
        {/* Dekorasi Background Bulatan Blur */}
        <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-6 bg-white p-4 rounded-2xl shadow-xl rotate-3">
            <img src="/logo.png" alt="Logo" className="w-20 h-auto object-contain" />
          </div>

          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4 uppercase">
            AC Sejuk Abadi
          </h1>
          <p className="text-blue-100 text-lg max-w-md leading-relaxed opacity-90">
            Sistem Pemulihan Akun. <br />
            Kami akan membantu Anda mendapatkan akses kembali ke panel kontrol Anda dengan aman.
          </p>
        </div>

        <div className="absolute bottom-8 left-12 text-blue-200/50 text-xs">
          © {new Date().getFullYear()} PT. Sejuk Abadi Teknik.
        </div>
      </div>

      {/* SISI KANAN: Form Section */}
      <div className="flex justify-center items-center p-6 sm:p-12 bg-white lg:rounded-l-[40px] shadow-[-20px_0_30px_rgba(0,0,0,0.03)] z-20 overflow-y-auto">
        <div className="w-full max-w-md">
          
          {/* Logo Mobile Only */}
          <div className="lg:hidden flex flex-col items-center mb-12">
            <div className="p-3 bg-primary/10 rounded-xl mb-2">
              <Snowflake className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">AC Sejuk Abadi</h2>
          </div>

          {/* Form Lupa Password */}
          <ForgotPasswordForm />

          {/* Footer Info Tambahan */}
          <div className="mt-12 text-center">
            <p className="text-xs text-slate-400">
              Butuh bantuan mendesak? <br />
              Hubungi IT Support di <span className="text-primary font-medium">support@sejukabadi.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}