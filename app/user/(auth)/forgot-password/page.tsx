import ForgotPasswordComponent from "@/components/user/pages/auth/forgor-password-page"; // Rename importnya di sini
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lupa Password | AC Sejuk Abadi",
  description: "Pulihkan akses ke akun Anda",
};

// Nama function di bawah ini tetap ForgotPasswordPage tidak apa-apa 
// karena import di atas sudah diganti namanya menjadi ForgotPasswordComponent
export default function ForgotPasswordPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-slate-50">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full -z-10" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl -z-10" />

      {/* Panggil komponen yang sudah di-rename tadi */}
      <ForgotPasswordComponent />
    </main>
  );
}