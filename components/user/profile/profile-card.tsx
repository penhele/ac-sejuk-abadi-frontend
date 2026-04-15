"use client";

import { Save, AlertCircle, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfileForm } from "./use-profile-form"; 
export function ProfileCard() {
  const { formData, isLoading, isDirty, handleSubmit, handleInputChange } = useProfileForm();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1">
      <Card className="border-none shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="p-8 border-b bg-slate-50/30">
          <CardTitle className="text-3xl font-black">Profil Pengguna</CardTitle>
          <CardDescription>ID Akun: <span className="text-blue-600 font-mono">#10229384</span></CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="p-8 space-y-10">
            {/* Render sub-section di sini */}
            <div className="space-y-6">
               <h3 className="font-bold text-lg">Informasi Dasar</h3>
               {/* Input fields... */}
            </div>
          </CardContent>

          <CardFooter className="p-8 bg-slate-50/50 flex flex-col md:flex-row justify-between gap-6">
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase">
              <AlertCircle size={14} /> Terakhir update: 2 menit yang lalu
            </div>
            <Button disabled={isLoading || !isDirty} type="submit" className="rounded-xl px-10 bg-blue-600">
              {isLoading ? <Loader2 className="animate-spin" /> : <><Save className="mr-2" size={16}/> Simpan</>}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}