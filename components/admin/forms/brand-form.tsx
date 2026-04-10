"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { X, ImagePlus, Briefcase } from "lucide-react";

interface Brand {
  id?: number;
  name: string;
  image_url: string | null;
}

interface BrandFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Brand) => void;
  initialData?: Brand | null;
  isLoading?: boolean;
}

export function BrandForm({ open, onOpenChange, onSubmit, initialData, isLoading }: BrandFormProps) {
  const [form, setForm] = useState<Brand>({
    name: "",
    image_url: null,
  });

  // Sinkronisasi data saat Edit
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({ name: "", image_url: null });
    }
  }, [initialData, open]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image_url: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return alert("Nama brand wajib diisi");
    onSubmit(form);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-100 rounded-[1.5rem]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              {initialData ? "Edit Brand" : "Tambah Brand Baru"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-6">
            {/* Upload Logo Section */}
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="relative w-32 h-32 border-2 border-dashed rounded-2xl overflow-hidden group bg-slate-50 flex items-center justify-center border-slate-200">
                {form.image_url ? (
                  <>
                    <img src={form.image_url} className="object-contain w-full h-full p-2" alt="brand logo" />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image_url: null })}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                  </>
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full hover:bg-slate-100 transition">
                    <ImagePlus className="w-8 h-8 text-slate-300" />
                    <span className="text-[10px] text-slate-400 mt-2 font-bold tracking-wider">UPLOAD LOGO</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImage} />
                  </label>
                )}
              </div>
              <p className="text-[10px] text-slate-400 italic text-center leading-tight">
                Gunakan logo dengan format PNG atau JPG.<br/>Max size 2MB.
              </p>
            </div>

            {/* Input Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Nama Brand</label>
              <Input
                placeholder="Contoh: Samsung, Daikin, LG..."
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl border-slate-200 focus:ring-indigo-500 h-11"
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => onOpenChange(false)}
              className="rounded-xl font-bold"
            >
              Batal
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold px-8 shadow-md"
            >
              {isLoading ? "Menyimpan..." : "Simpan Brand"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}