// src/app/(auth)/forgot-password/page.tsx
import { ForgotPasswordForm } from "@/components/user/auth/forgot-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lupa Password | NamaBrand",
  description: "Pulihkan akses ke akun Anda",
};

export default function ForgotPasswordPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      {/* Background Ornaments (Efek profesional seperti Admin) */}
      <div className="absolute top-0 left-0 w-full h-full bg-slate-50 dark:bg-slate-950 -z-10" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-100/50 dark:bg-indigo-900/10 rounded-full blur-3xl -z-10" />

      {/* Form Component */}
      <ForgotPasswordForm />
    </main>
  );
}