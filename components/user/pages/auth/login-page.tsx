"use client";

import LoginForm from "@/components/user/forms/login-form";
import { Snowflake, Loader2 } from "lucide-react"; 
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";
import { useState, Suspense } from "react"; 

type LoginInput = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: LoginInput): Promise<void> => {
    try {
      setLoading(true);

      const res = await login({
        email: data.email,
        password: data.password,
      });
      
      const token = res.access_token;
      const role = res.user?.role; 

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user_role", role || "user");

        if (role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/dashboard");
        }
        
        setTimeout(() => {
          router.refresh();
        }, 100);
      } else {
        alert("Login berhasil, tetapi akses token tidak ditemukan.");
      }

    } catch (err: any) {
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
      
      {/* Branding (Desktop Only) */}
      <div className="relative bg-primary w-full h-full hidden lg:flex flex-col justify-center items-center p-12 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-6 bg-white p-4 rounded-2xl shadow-xl">
            <img 
              src="/logo.png" 
              alt="ACSA Logo" 
              className="w-20 h-auto object-contain"
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

        <div className="absolute bottom-8 left-12 text-blue-200/50 text-xs font-mono">
          © 2026 PT. SEJUK ABADI TEKNIK
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-white lg:rounded-l-[40px] shadow-2xl z-20 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          
          {/* Mobile Header  */}
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="p-3 bg-primary/10 rounded-xl mb-2">
              <Snowflake className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">AC SEJUK ABADI</h2>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Selamat Datang
            </h2>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed">
              Silakan masuk ke akun Anda untuk mulai menggunakan sistem layanan <strong>AC Sejuk Abadi</strong>.
            </p>
          </div>

          <div className="mt-8">
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center p-8 space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm text-slate-400">Menyiapkan formulir...</p>
              </div>
            }>
              <LoginForm onSubmit={handleLogin} loading={loading} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}