"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Loader2 } from "lucide-react";
import { useState } from "react";

// Shadcn UI Components (Pastikan sudah di-install)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi API Call
    setTimeout(() => {
      alert("Link reset password telah dikirim ke email Anda!");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 p-6 transition-colors duration-300">
      
      <Card className="w-full max-w-md shadow-xl border-gray-200 dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        {/* Dekorasi Atas (Opsional agar senada dengan nuansa Admin) */}
        <div className="h-1.5 w-full bg-blue-600" />
        
        <CardHeader className="space-y-2 text-center pt-8">
          <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-2">
            <Mail className="text-blue-600 dark:text-blue-400" size={24} />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Lupa Password
          </CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400">
            Masukkan email Anda untuk menerima instruksi pemulihan kata sandi.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                Alamat Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@perusahaan.com"
                  required
                  disabled={isLoading}
                  className="pl-10 focus-visible:ring-blue-600 dark:bg-slate-800 dark:border-slate-700"
                />
                <Mail className="absolute left-3 top-2.5 text-slate-400" size={18} />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all py-6 rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengirim...
                </>
              ) : (
                "Kirim Link Reset"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col border-t border-gray-100 dark:border-slate-800 mt-4 bg-gray-50/50 dark:bg-slate-900/50 py-4">
          <Link 
            href="/login" 
            className="group flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Kembali ke halaman Login
          </Link>
        </CardFooter>
      </Card>
      
    </div>
  );
}