"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner"; 

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Field, 
  FieldLabel, 
  FieldDescription 
} from "@/components/ui/field"; 

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Alamat email wajib diisi");
      return;
    }

    setIsLoading(true);
    
    try {

      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      toast.success("Instruksi pemulihan telah dikirim!");
    } catch (err: any) {
      setError(err?.message || "Terjadi kesalahan. Silakan coba lagi.");
      toast.error("Gagal mengirim email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="text-center lg:text-left space-y-2">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Lupa Password?
              </h2>
              <p className="text-slate-500 text-sm">
                Masukkan email Anda dan kami akan mengirimkan link untuk mengatur ulang kata sandi.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field>
                <FieldLabel htmlFor="email">Alamat Email</FieldLabel>
                <div className="relative group">
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    disabled={isLoading}
                    className="pl-11 h-12"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                </div>
              </Field>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs font-medium animate-in fade-in duration-300">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold transition-all active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Kirim Instruksi"
                )}
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-8 space-y-6"
          >
            <div className="mx-auto w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="text-green-500" size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">Email Terkirim!</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">
                Kami telah mengirimkan link reset password ke <br />
                <span className="font-bold text-slate-900">{email}</span>
              </p>
            </div>
            <Button 
              variant="outline" 
              className="w-full h-11" 
              onClick={() => setIsSubmitted(false)}
            >
              Gunakan email lain
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <Link 
          href="/login" 
          className="group flex items-center justify-center text-sm font-bold text-blue-600 hover:underline decoration-2 underline-offset-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Kembali ke Login
        </Link>
      </div>
    </div>
  );
}