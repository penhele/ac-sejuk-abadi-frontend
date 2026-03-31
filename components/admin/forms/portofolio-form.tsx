"use client";

import { X, ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Definisikan tipe di sini agar bisa digunakan komponen lain
export interface Portfolio {
  title: string;
  description: string;
  images: string[];
}

interface PortfolioFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: Portfolio;
  setForm: (form: Portfolio) => void;
  onSubmit: () => void;
  isEdit: boolean;
}

// Gunakan Named Export untuk komponen helper
export function PortfolioForm({ open, onOpenChange, form, setForm, onSubmit, isEdit }: PortfolioFormProps) {
  
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({
          ...form,
          images: [...form.images, reader.result as string],
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (imgIndex: number) => {
    setForm({
      ...form,
      images: form.images.filter((_, i) => i !== imgIndex),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden rounded-2xl">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-bold">
            {isEdit ? "Perbarui Portofolio" : "Tambah Portofolio Baru"}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] p-6 pt-4">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Nama Proyek</label>
              <Input 
                value={form.title} 
                onChange={(e) => setForm({ ...form, title: e.target.value })} 
                placeholder="Misal: Perbaikan AC Split Central Mall" 
                className="rounded-xl h-11"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Detail Pekerjaan</label>
              <Textarea 
                value={form.description} 
                onChange={(e) => setForm({ ...form, description: e.target.value })} 
                className="min-h-32 rounded-xl" 
                placeholder="Jelaskan apa yang tim kerjakan..." 
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold flex justify-between text-slate-700">
                Foto Dokumentasi 
                <span className="text-xs text-blue-600 font-bold">{form.images.length} Foto</span>
              </label>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {form.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl border-2 overflow-hidden group">
                    <img src={img} className="w-full h-full object-cover" alt="upload-preview" />
                    <button 
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                <label className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 aspect-square transition-all border-slate-300 hover:border-blue-400">
                  <ImageIcon className="w-6 h-6 text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-500 mt-1 uppercase">Upload</span>
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleImages} />
                </label>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="p-6 bg-slate-50 border-t flex justify-end gap-3">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl">Batal</Button>
          <Button 
            onClick={onSubmit} 
            className="bg-blue-600 hover:bg-blue-700 px-8 rounded-xl font-bold shadow-lg shadow-blue-200" 
            disabled={!form.title || form.images.length === 0}
          >
            {isEdit ? "Simpan Perubahan" : "Publikasikan"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}