"use client";

import LoginForm from "@/components/user/forms/login-form";
import { Snowflake } from "lucide-react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";
import { useState } from "react";
// Import toast jika kamu punya shadcn/ui toast atau library lain
// import { toast } from "sonner"; 

type LoginInput = {
  email: string;
  password: string;
  captchaToken: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: LoginInput) => {
    try {
      setLoading(true);

      const res = await login(data);
      
      // Simpan token
      localStorage.setItem("token", res.token);

      // Gunakan toast jika ada, jika tidak alert tidak apa-apa untuk sementara
      // toast.success("Selamat datang kembali!");
      
      router.push("/user/profile");
      router.refresh(); // Memastikan state auth terbaru di-load
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Email atau password salah";

      alert(message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 grid lg:grid-cols-2 gap-0 h-screen overflow-hidden">
      
      {/* SISI KIRI: Branding Section */}
      <div className="relative bg-primary w-full h-full hidden lg:flex flex-col justify-center items-center p-12 overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-6 bg-white p-4 rounded-2xl shadow-xl">
             {/* Pastikan file ini ada di folder public/logo.png */}
            <img src="/logo.png" alt="Logo" className="w-20 h-auto object-contain" />
          </div>

          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4 uppercase">
            AC Sejuk Abadi
          </h1>
          <p className="text-blue-100 text-lg max-w-md leading-relaxed opacity-90">
            Solusi kenyamanan udara terbaik untuk hunian dan bisnis Anda. 
            Silakan masuk untuk mengelola layanan Anda.
          </p>
        </div>

        <div className="absolute bottom-8 left-12 text-blue-200/50 text-xs">
          © {new Date().getFullYear()} PT. Sejuk Abadi Teknik. All Rights Reserved.
        </div>
      </div>

      {/* SISI KANAN: Form Section */}
      <div className="flex justify-center items-center p-6 sm:p-12 bg-white lg:rounded-l-[40px] shadow-[-20px_0_30px_rgba(0,0,0,0.03)] z-20">
        <div className="w-full max-w-md space-y-8">
          
          {/* Logo Mobile Only */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="p-3 bg-primary/10 rounded-xl mb-2">
              <Snowflake className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">AC Sejuk Abadi</h2>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Selamat Datang
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Silakan masukkan email dan password untuk melanjutkan.
            </p>
          </div>

          {/* Form Component */}
          <div className="mt-8">
            <LoginForm onSubmit={handleLogin} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}