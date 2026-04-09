"use client";

import React from "react";
import { X, ImageIcon, Calendar, MapPin, Tag, Box, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Portfolio } from "@/types/portofolio";

interface PortfolioFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: Partial<Portfolio>;
  setForm: (form: any) => void;
  onSubmit: (files: File[]) => void;
  isEdit: boolean;
  isLoading?: boolean;
}

export function PortfolioForm({ 
  open, 
  onOpenChange, 
  form, 
  setForm, 
  onSubmit, 
  isEdit, 
  isLoading 
}: PortfolioFormProps) {
  
  // 1. Helper Tanggal (Solusi Error TS): Bisa terima String atau objek Date
  const formatDateForInput = (dateValue?: string | Date) => {
    if (!dateValue) return "";
    try {
      const d = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
      return d.toISOString().split('T')[0];
    } catch (e) {
      return "";
    }
  };

  // 2. Handler Tambah Gambar
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setForm({
      ...form,
      images: [...(form.images || []), ...newFiles],
    });
  };

  // 3. Handler Hapus Gambar
  const removeImage = (imgIndex: number) => {
    const updatedImages = form.images?.filter((_, i: number) => i !== imgIndex);
    setForm({
      ...form,
      images: updatedImages,
    });
  };

  // 4. Submit Hanya File Baru
  const handleFinalSubmit = () => {
    const filesOnly = (form.images || []).filter((img: any) => img instanceof File) as File[];
    onSubmit(filesOnly);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden rounded-[2rem] flex flex-col h-[85vh] border-none shadow-2xl">
        
        <DialogHeader className="p-8 pb-4 bg-white">
          <DialogTitle className="text-2xl font-bold text-slate-900">
            {isEdit ? "Update Portofolio" : "Tambah Proyek Baru"}
          </DialogTitle>
          <p className="text-sm text-slate-500 italic">Lengkapi dokumentasi hasil pengerjaan proyek AC Sejuk Abadi.</p>
        </DialogHeader>

        <ScrollArea className="flex-1 px-8 bg-white">
          <div className="space-y-6 pb-10">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-blue-500" /> ID Produk (UUID) *
                </label>
                <Input 
                  value={form.id_product || ""} 
                  onChange={(e) => setForm({ ...form, id_product: e.target.value })} 
                  placeholder="Masukkan UUID Produk" 
                  className="rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-blue-500" /> Kategori *
                </label>
                <Input 
                  value={form.category || ""} 
                  onChange={(e) => setForm({ ...form, category: e.target.value })} 
                  placeholder="e.g. Interior / Instalasi" 
                  className="rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Nama Proyek *</label>
              <Input 
                value={form.name || ""} 
                onChange={(e) => setForm({ ...form, name: e.target.value })} 
                placeholder="Contoh: Renovasi Kantor Central Park" 
                className="rounded-xl border-slate-200"
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" /> Lokasi *
                </label>
                <Input 
                  value={form.location || ""} 
                  onChange={(e) => setForm({ ...form, location: e.target.value })} 
                  placeholder="e.g. Jakarta Selatan" 
                  className="rounded-xl border-slate-200"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" /> Tanggal Proyek *
                </label>
                <Input 
                  type="date"
                  // formatDateForInput sekarang aman menerima Date | string | undefined
                  value={formatDateForInput(form.date)} 
                  onChange={(e) => setForm({ 
                    ...form, 
                    date: e.target.value ? new Date(e.target.value).toISOString() : "" 
                  })} 
                  className="rounded-xl border-slate-200"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Detail Pekerjaan</label>
              <Textarea 
                value={form.description || ""} 
                onChange={(e) => setForm({ ...form, description: e.target.value })} 
                placeholder="Jelaskan secara singkat pengerjaan proyek ini..." 
                className="min-h-24 rounded-xl border-slate-200 resize-none focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                Foto Dokumentasi 
                <span className="text-[10px] normal-case font-normal text-slate-400">Mendukung banyak foto</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {form.images?.map((img: any, idx: number) => (
                  <div key={idx} className="relative aspect-video rounded-xl border-2 border-slate-100 overflow-hidden group shadow-sm">
                    <img 
                      src={img instanceof File ? URL.createObjectURL(img) : img} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                      alt="preview" 
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <button 
                      type="button" 
                      onClick={() => removeImage(idx)} 
                      className="absolute top-1.5 right-1.5 bg-white/90 text-red-500 rounded-full p-1 shadow-lg hover:bg-red-500 hover:text-white transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                <label className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 hover:border-blue-300 aspect-video transition-all border-slate-200 bg-slate-50/50">
                  <ImageIcon className="w-6 h-6 text-slate-400 mb-1" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Tambah Foto</span>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImages} 
                    disabled={isLoading}
                  />
                </label>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="p-8 bg-slate-50 border-t flex justify-end gap-3 mt-auto">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="rounded-xl text-slate-500"
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button 
            onClick={handleFinalSubmit} 
            disabled={isLoading || !form.name || !form.id_product || !form.location}
            className="bg-blue-600 hover:bg-blue-700 px-10 rounded-xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </div>
            ) : (
              isEdit ? "Simpan Perubahan" : "Publikasikan Proyek"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}