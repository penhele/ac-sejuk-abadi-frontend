"use client";

import { useState } from "react";
import { Save, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Shared & Sub-components
import { UserSidebar } from "@/components/user/user-sidebar";
import { PersonalInfoForm } from "@/components/user/profile/personal-info-form";
import { SecuritySection } from "@/components/user/profile/security-section";

export default function ProfilePageContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [showPass, setShowPass] = useState({ old: false, new: false, confirm: false });

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
    // Simulasi API Call
    setTimeout(() => {
      setIsLoading(false);
      setIsDirty(false);
      toast.success("Profil berhasil diperbarui!");
    }, 2000);
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl antialiased min-h-screen">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* SIDEBAR - Menggunakan Shared Component */}
        <UserSidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-none shadow-2xl shadow-blue-500/5 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
              <CardHeader className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/30">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-3xl font-black tracking-tight">Profil Pengguna</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      ID Akun: <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs">#10229384</span>
                    </CardDescription>
                  </div>
                  <div className="h-16 w-16 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 hidden md:flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-500/20">
                    BS
                  </div>
                </div>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="p-8 space-y-10">
                  <PersonalInfoForm formData={formData} handleInputChange={handleInputChange} />
                  <SecuritySection 
                    formData={formData} 
                    showPass={showPass} 
                    setShowPass={setShowPass} 
                    handleInputChange={handleInputChange} 
                  />
                </CardContent>

                <CardFooter className="p-8 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-2 text-slate-400">
                    <AlertCircle size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Terakhir update: 2 menit yang lalu</span>
                  </div>
                  
                  <div className="flex gap-3 w-full md:w-auto">
                    <Button 
                      variant="outline" 
                      type="button" 
                      className="flex-1 md:flex-none rounded-xl h-11 px-6 font-bold"
                      onClick={() => setIsDirty(false)}
                    >
                      Batal
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isLoading || !isDirty}
                      className={cn(
                        "flex-1 md:flex-none rounded-xl h-11 px-10 font-bold transition-all shadow-xl",
                        isDirty 
                          ? "bg-blue-600 hover:bg-blue-700 shadow-blue-500/25 text-white" 
                          : "bg-slate-200 text-slate-400 cursor-not-allowed"
                      )}
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