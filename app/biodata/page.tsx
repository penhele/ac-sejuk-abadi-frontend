"use client";

import { useState, useEffect } from "react";
import { 
  User, Mail, Phone, Lock, Save, 
  ShieldCheck, Settings, Heart,
  Eye, EyeOff, CheckCircle2, AlertCircle,
  ChevronRight, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false); // Point 5: Cek apakah ada perubahan
  const [showPass, setShowPass] = useState({ old: false, new: false, confirm: false });

  // Mock initial data
  const [formData, setFormData] = useState({
    name: "Budi Santoso",
    email: "budi@email.com",
    phone: "08123456789",
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setIsDirty(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Konfirmasi password tidak cocok!");
      return;
    }
    
    setIsLoading(true);
    // Simulasi API call
    setTimeout(() => {
      setIsLoading(false);
      setIsDirty(false);
      toast.success("Profil berhasil diperbarui!");
    }, 2000);
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl antialiased">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* --- SIDEBAR NAV (Point 8: Active State Jelas) --- */}
        <aside className="w-full lg:w-64 space-y-2">
          <div className="px-4 mb-6">
             <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600/60">Pengaturan</h2>
          </div>
          <nav className="space-y-1">
            <SidebarLink icon={<User size={18} />} label="Profil Pribadi" active />
            <SidebarLink icon={<Heart size={18} />} label="Wishlist" />
          </nav>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-none shadow-2xl shadow-blue-500/5 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
              <CardHeader className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/30">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-3xl font-black tracking-tight">Profil Pengguna</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      ID Akun: <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs">#10229384</span>
                    </CardDescription>
                  </div>
                  <div className="hidden md:block">
                    <div className="h-16 w-16 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-500/20">
                      BS
                    </div>
                  </div>
                </div>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="p-8 space-y-10">
                  
                  {/* --- SECTION 1: DASAR (Point 2: Section Divider) --- */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-1 bg-blue-600 rounded-full" />
                      <h3 className="font-bold text-lg tracking-tight text-slate-800 dark:text-slate-100">Informasi Dasar</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[11px] font-black uppercase tracking-widest text-slate-400">Nama Lengkap</Label>
                        <div className="group relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                          <Input id="name" value={formData.name} onChange={handleInputChange} className="pl-10 h-11 rounded-xl border-slate-200 focus:ring-4 focus:ring-blue-500/10 transition-all" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[11px] font-black uppercase tracking-widest text-slate-400">Alamat Email</Label>
                        <div className="group relative opacity-60">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input id="email" type="email" value={formData.email} disabled className="pl-10 h-11 rounded-xl bg-slate-50 cursor-not-allowed" />
                          <div className="absolute right-3 top-3 text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 size={12} /> Terverifikasi
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[11px] font-black uppercase tracking-widest text-slate-400">Nomor Telepon</Label>
                        <div className="group relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                          <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="pl-10 h-11 rounded-xl border-slate-200" />
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* --- SECTION 2: KEAMANAN (Point 3: Password UX) --- */}
                  <section className="space-y-6 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-1 bg-red-500 rounded-full" />
                      <h3 className="font-bold text-lg tracking-tight text-slate-800 dark:text-slate-100">Ubah Kata Sandi</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <PasswordField 
                        id="oldPassword" 
                        label="Password Lama" 
                        show={showPass.old} 
                        onToggle={() => setShowPass({...showPass, old: !showPass.old})} 
                        value={formData.oldPassword}
                        onChange={handleInputChange}
                      />
                      <PasswordField 
                        id="newPassword" 
                        label="Password Baru" 
                        show={showPass.new} 
                        onToggle={() => setShowPass({...showPass, new: !showPass.new})} 
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        helper="Min. 8 Karakter" // Point 4: Helper Text
                      />
                      <PasswordField 
                        id="confirmPassword" 
                        label="Konfirmasi Password Baru" 
                        show={showPass.confirm} 
                        onToggle={() => setShowPass({...showPass, confirm: !showPass.confirm})} 
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                  </section>

                  {/* --- Point 6: Real Security Alert --- */}
                  <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 dark:bg-blue-900/10 dark:border-blue-800 flex gap-4">
                    <div className="p-2 bg-blue-600 rounded-lg shrink-0 h-fit">
                       <ShieldCheck className="text-white w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-blue-900 dark:text-blue-300">Tips Keamanan</p>
                      <p className="text-xs text-blue-700/80 dark:text-blue-400/80 leading-relaxed">
                        Gunakan kombinasi huruf besar, angka, dan simbol untuk password yang kuat. Jangan pernah membagikan kode OTP atau password Anda kepada siapapun.
                      </p>
                    </div>
                  </div>

                </CardContent>

                <CardFooter className="p-8 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-2 text-slate-400">
                    <AlertCircle size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Terakhir update: 2 menit yang lalu</span>
                  </div>
                  
                  <div className="flex gap-3 w-full md:w-auto">
                    <Button variant="outline" type="button" className="flex-1 md:flex-none rounded-xl h-11 px-6 font-bold text-slate-600">
                      Batal
                    </Button>
                    <Button 
                      type="submit" 
                      className={cn(
                        "flex-1 md:flex-none rounded-xl h-11 px-10 font-bold transition-all shadow-xl",
                        isDirty ? "bg-blue-600 hover:bg-blue-700 shadow-blue-500/25" : "bg-slate-200 text-slate-400 cursor-not-allowed"
                      )}
                      disabled={isLoading || !isDirty} // Point 5: Disable if not dirty
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <div className="flex items-center gap-2 uppercase text-xs tracking-widest">
                          <Save size={16} /> Simpan Profil
                        </div>
                      )}
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* --- SUB-COMPONENTS --- */

function SidebarLink({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Button 
      variant="ghost" 
      className={cn(
        "w-full justify-between h-12 rounded-xl px-4 transition-all group",
        active 
          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-600 hover:text-white" 
          : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
      )}
    >
      <div className="flex items-center gap-3 font-bold text-sm tracking-tight">
        {icon}
        {label}
      </div>
      <ChevronRight size={14} className={cn("opacity-0 group-hover:opacity-100 transition-opacity", active && "opacity-100")} />
    </Button>
  );
}

function PasswordField({ id, label, show, onToggle, value, onChange, helper }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor={id} className="text-[11px] font-black uppercase tracking-widest text-slate-400">{label}</Label>
        {helper && <span className="text-[10px] text-blue-600 font-bold">{helper}</span>}
      </div>
      <div className="group relative">
        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
        <Input 
          id={id} 
          type={show ? "text" : "password"} 
          value={value}
          onChange={onChange}
          placeholder="••••••••" 
          className="pl-10 pr-10 h-11 rounded-xl border-slate-200 focus:ring-4 focus:ring-blue-500/10 transition-all" 
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-3 text-slate-400 hover:text-blue-600 transition-colors"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}