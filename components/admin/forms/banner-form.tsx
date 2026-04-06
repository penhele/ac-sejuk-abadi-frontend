"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Image as ImageIcon, Calendar, Tag, Hash, X } from "lucide-react";

// Update Interface agar sesuai dengan DTO Backend
export interface Banner {
  id?: number;
  id_brand: number; // Wajib di BE
  name: string;     // Wajib di BE (sebelumnya title)
  category?: string;
  start_date: string;
  end_date: string;
  image?: string;
}

interface BannerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit: boolean;
  form: Partial<Banner>;
  setForm: (form: any) => void;
  onSubmit: (file: File | null) => void; // Mengirim file asli ke parent
  isLoading?: boolean;
}

export function BannerForm({
  open,
  onOpenChange,
  isEdit,
  form,
  setForm,
  onSubmit,
  isLoading,
}: BannerFormProps) {
  
  // State lokal untuk preview gambar agar tidak mengotori state form utama dengan blob URL
  const [localPreview, setLocalPreview] = React.useState<string | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setLocalPreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setLocalPreview(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-2xl flex flex-col h-[85vh]">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold">
            {isEdit ? "Perbarui Banner" : "Tambah Banner Baru"}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-5 pb-6">
            
            {/* id_brand: Wajib (Number) */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Hash className="w-4 h-4 text-blue-500" /> ID Brand *
              </label>
              <Input
                type="number"
                placeholder="Masukkan ID Brand (misal: 1)"
                value={form.id_brand || ""}
                onChange={(e) => setForm({ ...form, id_brand: parseInt(e.target.value) })}
                className="rounded-xl"
              />
            </div>

            {/* name: Wajib (String) */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Nama Banner *</label>
              <Input
                placeholder="Contoh: Promo AC Daikin Ramadhan"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl"
              />
            </div>

            {/* category: Optional */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-500" /> Kategori
              </label>
              <Input
                placeholder="Misal: Homepage / Sidebar"
                value={form.category || ""}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="rounded-xl"
              />
            </div>

            {/* Dates: Start & End */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" /> Mulai *
                </label>
                <Input
                  type="date"
                  value={form.start_date ? new Date(form.start_date).toISOString().split('T')[0] : ""}
                  onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" /> Berakhir *
                </label>
                <Input
                  type="date"
                  value={form.end_date ? new Date(form.end_date).toISOString().split('T')[0] : ""}
                  onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Image Upload: Sesuai Single FileInterceptor */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Visual Banner *</label>
              <div className="relative group">
                <label className={`
                  flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed transition-all cursor-pointer
                  ${localPreview || form.image ? 'border-transparent' : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50'}
                `}>
                  {localPreview || form.image ? (
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <img 
                        src={localPreview || form.image} 
                        className="w-full h-full object-cover" 
                        alt="Preview" 
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-xs font-bold">Ganti Gambar</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
                      <span className="text-xs font-medium text-slate-500 text-center px-4">
                        Klik untuk unggah gambar banner
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />
                </label>
                {(localPreview || form.image) && (
                  <button 
                    type="button"
                    onClick={clearImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-[10px] text-slate-400 text-center italic">Rekomendasi aspek rasio 16:9 atau 21:9</p>
            </div>
          </div>
        </ScrollArea>

        <div className="p-6 bg-slate-50 border-t flex justify-end gap-3 mt-auto">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl">
            Batal
          </Button>
          <Button 
            onClick={() => onSubmit(selectedFile)} 
            disabled={isLoading || !form.name || !form.id_brand || (!selectedFile && !form.image)}
            className="bg-blue-600 hover:bg-blue-700 px-8 rounded-xl font-bold shadow-lg shadow-blue-100"
          >
            {isLoading ? "Memproses..." : isEdit ? "Simpan Perubahan" : "Publikasikan"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}