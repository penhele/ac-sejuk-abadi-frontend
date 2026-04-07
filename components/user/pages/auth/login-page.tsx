"use client";

import LoginForm from "@/components/user/forms/login-form";
import { Snowflake } from "lucide-react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";
import { useState } from "react";

// Definisikan tipe input agar konsisten dengan LoginForm
type LoginInput = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Gunakan async/await dengan benar
  const handleLogin = async (data: LoginInput): Promise<void> => {
    try {
      setLoading(true);

      // 1. Panggil API login
      const res = await login({
        email: data.email,
        password: data.password,
      });
      
      // 2. Ambil data (Gunakan res.access_token sesuai hasil Postman)
      const token = res.access_token;
      const role = res.user?.role; 

      if (token) {
        // Simpan data untuk kebutuhan auth kedepannya
        localStorage.setItem("token", token);
        localStorage.setItem("user_role", role || "user");

        // 3. LOGIKA REDIRECT BERDASARKAN ROLE
        if (role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/dashboard");
        }
        
        // Refresh untuk memastikan middleware/layout mendeteksi token baru
        setTimeout(() => {
          router.refresh();
        }, 100);
      } else {
        alert("Login berhasil, tetapi akses token tidak ditemukan.");
      }

    } catch (err: any) {
      // Menampilkan pesan error yang dikirim oleh Express/Vercel
      const errorMessage = 
        err?.response?.data?.message || 
        "Gagal masuk. Silakan cek email dan password Anda.";
      
      console.error("Login Error:", err);
      alert(errorMessage); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 grid lg:grid-cols-2 gap-0 h-screen overflow-hidden">
      
      {/* SISI KIRI: Branding */}
      <div className="relative bg-primary w-full h-full hidden lg:flex flex-col justify-center items-center p-12 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-6 bg-white p-4 rounded-2xl shadow-xl">
            <img 
              src="/logo.png" 
              alt="ACSA Logo" 
              className="w-20 h-auto object-contain"
              // Fallback jika logo belum diupload
              onError={(e) => (e.currentTarget.src = "https://placehold.co/80x80?text=ACSA")} 
            />
          </div>

          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4 uppercase">
            AC Sejuk Abadi
          </h1>
          <p className="text-blue-100 text-lg max-w-md leading-relaxed opacity-90">
            Solusi kenyamanan udara terbaik untuk hunian dan bisnis Anda.
          </p>
        </div>

        <div className="absolute bottom-8 left-12 text-blue-200/50 text-xs">
          © {new Date().getFullYear()} PT. Sejuk Abadi Teknik.
        </div>
      </div>

      {/* SISI KANAN: Login Form */}
      <div className="flex justify-center items-center p-6 sm:p-12 bg-white lg:rounded-l-[40px] shadow-[-20px_0_30px_rgba(0,0,0,0.03)] z-20">
        <div className="w-full max-w-md space-y-8">
          
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
              Silakan login untuk mengakses layanan **AC Sejuk Abadi**.
            </p>
          </div>

          <div className="mt-8">
            {/* Sekarang sudah sinkron dengan LoginFormProps */}
            <LoginForm onSubmit={handleLogin} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}