"use client";

import { useState } from "react";
import { 
  User, Mail, Phone, Lock, Save, 
  ShieldCheck, Settings, Heart,
  Eye, EyeOff // 🔥 Import ikon mata
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 🔥 State untuk toggle password

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* --- SIDEBAR NAV --- */}
        <aside className="w-full md:w-64 space-y-2">
          <div className="px-3 py-2">
            <h2 className="mb-4 text-lg font-semibold tracking-tight text-blue-600 dark:text-blue-400">
              Pengaturan Akun
            </h2>
            <nav className="space-y-1">
              <Button variant="secondary" className="w-full justify-start gap-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                <User size={18} /> Profil Pribadi
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 opacity-60">
                <Heart size={18} className="text-red-500 fill-red-500" /> Wishlist
              </Button>
            </nav>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-1">
          <Card className="border-none shadow-xl shadow-blue-500/5 bg-white dark:bg-slate-900 overflow-hidden">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b dark:border-slate-800 pb-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="text-center md:text-left">
                  <CardTitle className="text-2xl font-bold">Profil Pengguna</CardTitle>
                  <CardDescription className="text-sm mt-1">
                    ID Akun: <span className="font-mono text-blue-600">#10229384</span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="grid gap-8 p-8">
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                    <Settings size={16} />
                    <span className="text-sm uppercase tracking-wider">Informasi Dasar</span>
                  </div>
                  <Separator className="opacity-50" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nama, Email, Phone tetap sama */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs font-bold uppercase opacity-60">Nama Lengkap</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="name" placeholder="Budi Santoso" className="pl-10 dark:bg-slate-950 border-slate-200 dark:border-slate-800" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-bold uppercase opacity-60">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="email" type="email" placeholder="budi@email.com" className="pl-10 dark:bg-slate-950 border-slate-200 dark:border-slate-800" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs font-bold uppercase opacity-60">Nomor Telepon</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="phone" type="tel" placeholder="0812xxxxxxx" className="pl-10 dark:bg-slate-950 border-slate-200 dark:border-slate-800" />
                      </div>
                    </div>

                    {/* --- INPUT PASSWORD DENGAN TOGGLE MATA --- */}
                    <div className="space-y-2">
                      <Label htmlFor="pass" className="text-xs font-bold uppercase opacity-60">Password Baru</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="pass" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          className="pl-10 pr-10 dark:bg-slate-950 border-slate-200 dark:border-slate-800" 
                        />
                        {/* Tombol Toggle Mata */}
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-blue-600 transition-colors"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Warning Card */}
                <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 flex gap-4">
                  <ShieldCheck className="text-amber-600 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-amber-900 dark:text-amber-400">Keamanan Akun</p>
                    <p className="text-xs text-amber-700 dark:text-amber-500/80">
                      Nanti ini diisi peringatan, belum kepikiran apa. Kami menyarankan Anda untuk segera cek kembali demi keamanan data.
                    </p>
                  </div>
                </div>

              </CardContent>

              <CardFooter className="bg-slate-50/50 dark:bg-slate-800/30 p-8 border-t dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between">
                <p className="text-xs text-muted-foreground italic">
                  Terakhir diperbarui: 26 Maret 2026, 14:45 WIB
                </p>
                <div className="flex gap-3 w-full md:w-auto">
                  <Button variant="outline" type="button" className="flex-1 md:flex-none">Batalkan</Button>
                  <Button 
                    type="submit" 
                    className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-lg shadow-blue-500/20"
                    disabled={isLoading}
                  >
                    {isLoading ? "Menyimpan..." : <><Save size={16} /> Simpan Perubahan</>}
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}