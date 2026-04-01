// src/components/auth/forgot-password-form.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner"; // Disarankan menggunakan sonner untuk toast profesional

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi API Call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      toast.success("Instruksi pemulihan telah dikirim!");
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md shadow-2xl border-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl overflow-hidden rounded-3xl">
        <div className="h-2 w-full bg-blue-600" />
        
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CardHeader className="space-y-3 text-center pt-10">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-2 rotate-3 hover:rotate-0 transition-transform duration-300 shadow-inner">
                  <Mail className="text-blue-600 dark:text-blue-400" size={28} />
                </div>
                <CardTitle className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">
                  Lupa Password?
                </CardTitle>
                <CardDescription className="text-balance px-4 text-slate-500 dark:text-slate-400">
                  Jangan khawatir! Masukkan email Anda dan kami akan mengirimkan link untuk mengatur ulang kata sandi Anda.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                      Alamat Email
                    </Label>
                    <div className="relative group">
                      <Input
                        id="email"
                        type="email"
                        placeholder="nama@email.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        className="pl-11 h-12 rounded-xl border-slate-200 focus:ring-blue-600 dark:bg-slate-800/50 dark:border-slate-700 transition-all shadow-sm"
                      />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Memproses...</span>
                      </div>
                    ) : (
                      "Kirim Instruksi"
                    )}
                  </Button>
                </form>
              </CardContent>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-12 px-8 text-center space-y-6"
            >
              <div className="mx-auto w-20 h-20 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="text-green-500" size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Email Terkirim!</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Kami telah mengirimkan link reset password ke <span className="font-bold text-slate-900 dark:text-white">{email}</span>.
                </p>
              </div>
              <Button 
                variant="outline" 
                className="w-full rounded-xl border-slate-200" 
                onClick={() => setIsSubmitted(false)}
              >
                Gunakan email lain
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <CardFooter className="flex flex-col border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 py-6">
          <Link 
            href="/login" 
            className="group flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline decoration-2 underline-offset-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Kembali ke Login
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}