"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { X, UserPlus, Image as ImageIcon } from "lucide-react";

export default function AboutDialog({ open, setOpen, onSave }: any) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    image_url: null as string | null,
  });

  // Handle Single Image Upload (Sesuai image_url: null)
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image_url: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setForm((prev) => ({ ...prev, image_url: null }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.role) {
      alert("Nama dan Role wajib diisi");
      return;
    }
    
    onSave(form);
    // Reset Form
    setForm({
      name: "",
      role: "",
      image_url: null,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-106.25 rounded-[1.5rem]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-blue-600" />
            Tambah Data Staff
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5 py-4">
          {/* Preview & Upload Foto Profile */}
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="relative w-24 h-24 border-2 border-dashed rounded-full overflow-hidden group bg-slate-50 flex items-center justify-center">
              {form.image_url ? (
                <>
                  <img src={form.image_url} className="object-cover w-full h-full" alt="profile" />
                  <button
                    onClick={removeImage}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full hover:bg-slate-100 transition">
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                  <span className="text-[10px] text-slate-400 mt-1 font-bold">FOTO</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImage} 
                  />
                </label>
              )}
            </div>
            <p className="text-[10px] text-slate-400 font-medium italic">*Klik lingkaran untuk upload foto</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 ml-1">Nama Lengkap</label>
              <Input
                placeholder="Contoh: Budi Santoso"
                value={form.name}
                className="rounded-xl border-slate-200 focus:ring-blue-500"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 ml-1">Jabatan / Role</label>
              <Input
                placeholder="Contoh: Manager / Teknisi"
                value={form.role}
                className="rounded-xl border-slate-200 focus:ring-blue-500"
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button 
            variant="ghost" 
            className="rounded-xl font-bold text-slate-500" 
            onClick={() => setOpen(false)}
          >
            Batal
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 rounded-xl font-bold px-8"
          >
            Simpan Staff
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}