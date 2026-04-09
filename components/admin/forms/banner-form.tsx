"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Image as ImageIcon, Calendar, Tag, Hash, X, Loader2 } from "lucide-react";

export interface Banner {
  id?: number;
  id_brand: number;
  name: string;
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
  onSubmit: (file: File | null) => void;
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
  
  const [localPreview, setLocalPreview] = React.useState<string | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  // Reset preview saat modal ditutup atau dibuka untuk data baru
  useEffect(() => {
    if (!open) {
      setLocalPreview(null);
      setSelectedFile(null);
    }
  }, [open]);

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

  const formatDateForInput = (isoString?: string) => {
    if (!isoString) return "";
    try {
      return new Date(isoString).toISOString().split('T')[0];
    } catch (e) {
      return "";
    }
  };

  // Validasi sederhana agar tombol tidak aktif jika field wajib kosong
  const isInvalid = !form.name || !form.id_brand || !form.start_date || !form.end_date || (!selectedFile && !form.image);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-2xl flex flex-col h-[85vh] border-none shadow-2xl">
        <DialogHeader className="p-6 pb-2 bg-white">
          <DialogTitle className="text-xl font-bold text-slate-900">
            {isEdit ? "Perbarui Visual Banner" : "Buat Banner Promo Baru"}
          </DialogTitle>
          <p className="text-xs text-slate-500 italic">Pastikan data sesuai dengan campaign pemasaran.</p>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 bg-white">
          <div className="space-y-5 pb-6">
            
            {/* Visual Banner Preview */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Media Utama</label>
              <div className="relative group">
                <label className={`
                  flex flex-col items-center justify-center aspect-[21/9] rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden
                  ${localPreview || form.image ? 'border-blue-200' : 'border-slate-200 hover:border-blue-400 hover:bg-blue-50/50'}
                `}>
                  {localPreview || form.image ? (
                    <div className="relative w-full h-full">
                      <img 
                        src={localPreview || form.image} 
                        className="w-full h-full object-cover" 
                        alt="Preview" 
                      />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <div className="flex items-center gap-2 text-white bg-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
                          <ImageIcon className="w-4 h-4" /> Ganti Gambar
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="p-3 bg-slate-50 rounded-full mb-2">
                        <ImageIcon className="w-6 h-6 text-slate-400" />
                      </div>
                      <span className="text-xs font-bold text-slate-500">Unggah Gambar Banner</span>
                      <span className="text-[10px] text-slate-400 mt-1">Format: JPG, PNG, WEBP</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                </label>
                {(localPreview || form.image) && (
                  <button 
                    type="button"
                    onClick={clearImage}
                    className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-1.5 shadow-xl border border-red-50 hover:bg-red-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* id_brand & Category */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Hash className="w-3 h-3 text-blue-500" /> Brand ID *
                </label>
                <Input
                  type="number"
                  placeholder="ID"
                  value={form.id_brand || ""}
                  onChange={(e) => setForm({ ...form, id_brand: e.target.value ? parseInt(e.target.value) : 0 })}
                  className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Tag className="w-3 h-3 text-blue-500" /> Kategori
                </label>
                <Input
                  placeholder="e.g. Promo"
                  value={form.category || ""}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* name: Wajib */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Judul Banner *</label>
              <Input
                placeholder="Nama campaign banner..."
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl border-slate-200"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-blue-500" /> Tgl Mulai *
                </label>
                <Input
                  type="date"
                  value={formatDateForInput(form.start_date)}
                  onChange={(e) => setForm({ 
                    ...form, 
                    start_date: e.target.value ? new Date(e.target.value).toISOString() : "" 
                  })}
                  className="rounded-xl border-slate-200"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-blue-500" /> Tgl Selesai *
                </label>
                <Input
                  type="date"
                  value={formatDateForInput(form.end_date)}
                  onChange={(e) => setForm({ 
                    ...form, 
                    end_date: e.target.value ? new Date(e.target.value).toISOString() : "" 
                  })}
                  className="rounded-xl border-slate-200"
                />
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="p-6 bg-slate-50 border-t flex justify-end gap-3 mt-auto">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)} 
            disabled={isLoading}
            className="rounded-xl text-slate-500 hover:bg-slate-200 transition-colors"
          >
            Batal
          </Button>
          <Button 
            onClick={() => onSubmit(selectedFile)} 
            disabled={isLoading || isInvalid}
            className="bg-blue-600 hover:bg-blue-700 px-10 rounded-xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              isEdit ? "Simpan Perubahan" : "Publikasikan"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}