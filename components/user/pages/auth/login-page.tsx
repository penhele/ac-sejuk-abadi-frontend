"use client";

import LoginForm from "@/components/user/forms/login-form";
import { Snowflake } from "lucide-react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";
import { useState } from "react";

type LoginInput = {
  email: string;
  password: string;
  captchaToken: string;
};

export default function LoginPage() {
  const router = useRouter();
const [loading, setLoading] = useState(false);
  // ✅ HANDLE LOGIN (SUDAH AMAN)
  const handleLogin = async (data: LoginInput) => {
  try {
    setLoading(true); // mulai loading

    const res = await login(data);

    const token = res.token;

    localStorage.setItem("token", token);

    alert("Login berhasil");

    router.push("/user/profile");
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "Login gagal";

    alert(message);
  } finally {
    setLoading(false); // stop loading
  }
  };

  return (
    <div className="bg-slate-50 grid lg:grid-cols-2 gap-0 h-screen overflow-hidden">
      
      {/* SISI KIRI */}
      <div className="relative bg-primary w-full h-full hidden lg:flex flex-col justify-center items-center p-12 overflow-hidden">
        
        <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-6">
            <img src="/logo.png" alt="Logo" className="w-24 h-auto object-contain" />
          </div>

          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
            AC SEJUK ABADI
          </h1>
          <p className="text-blue-100 text-lg max-w-md leading-relaxed">
            Solusi kenyamanan udara terbaik untuk hunian dan bisnis Anda. 
            Silakan masuk ke panel administrasi.
          </p>
        </div>

        <div className="absolute bottom-8 left-12 text-blue-200/50 text-sm">
          © 2026 PT. Sejuk Abadi Teknik.
        </div>
      </div>

      {/* SISI KANAN */}
      <div className="flex justify-center items-center p-6 sm:p-12 bg-white lg:rounded-l-[40px] shadow-[-20px_0_30px_rgba(0,0,0,0.03)] z-20">
        <div className="w-full max-w-md space-y-8">
          
          <div className="lg:hidden flex flex-col items-center mb-8">
            <Snowflake className="w-12 h-12 text-primary mb-2" />
            <h2 className="text-2xl font-bold text-slate-900">AC Sejuk Abadi</h2>
          </div>

          <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Selamat Datang
            </h2>
            <p className="text-slate-500 mt-2">
              Masukkan kredensial Anda untuk mengakses akun.
            </p>
          </div>

          {/* ✅ CONNECT KE FORM */}
<LoginForm onSubmit={handleLogin} loading={loading} />          
        </div>
      </div>
    </div>
  );
}