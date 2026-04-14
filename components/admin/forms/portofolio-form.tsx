"use client";

import React from "react";
import { Calendar, MapPin, Tag, Box, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
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
  isLoading = false 
}: PortfolioFormProps) {
  
  // Helper Format Tanggal (Sama dengan MarketingForm agar stabil)
  const formatDateForInput = (dateValue?: string | Date) => {
    if (!dateValue) return "";
    try {
      const d = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
      return d.toISOString().split('T')[0];
    } catch (e) {
      return "";
    }
  };

  // Fungsi internal untuk validasi sebelum memanggil onSubmit dari Page
  const handleAction = () => {
    if (!form.id_product || form.id_product.trim() === "") {
      alert("ID Produk (UUID) wajib diisi!");
      return;
    }
    if (!form.name) {
      alert("Nama proyek wajib diisi!");
      return;
    }
    // Panggil onSubmit dari PortfolioPage dengan array kosong (karena fitur gambar ditiadakan)
    onSubmit([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-[2rem] border-none shadow-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            {isEdit ? "Update Portofolio" : "Tambah Portofolio"}
          </DialogTitle>
          <p className="text-xs text-slate-400 italic">Pastikan UUID produk sesuai dengan Admin Management</p>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* UUID Produk */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
              <Box className="w-3 h-3 text-blue-600" /> ID Produk (UUID)
            </label>
            <Input 
              value={form.id_product || ""} 
              onChange={(e) => setForm({ ...form, id_product: e.target.value })} 
              placeholder="Paste UUID di sini..." 
              className="rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-colors"
              disabled={isLoading}
            />
          </div>

          {/* Nama Proyek */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Nama Proyek</label>
            <Input 
              value={form.name || ""} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
              placeholder="Contoh: Instalasi AC Central" 
              className="rounded-xl border-slate-200"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Kategori */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                <Tag className="w-3 h-3 text-blue-600" /> Kategori
              </label>
              <Input 
                value={form.category || ""} 
                onChange={(e) => setForm({ ...form, category: e.target.value })} 
                placeholder="Interior/AC" 
                className="rounded-xl border-slate-200"
                disabled={isLoading}
              />
            </div>
            {/* Tanggal */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-blue-600" /> Tanggal
              </label>
              <Input 
                type="date"
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

          {/* Deskripsi */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Deskripsi Proyek</label>
            <Textarea 
              value={form.description || ""} 
              onChange={(e) => setForm({ ...form, description: e.target.value })} 
              placeholder="Jelaskan detail pengerjaan..." 
              className="min-h-20 rounded-xl border-slate-200 resize-none"
              disabled={isLoading}
            />
          </div>
        </div>

        <DialogFooter className="flex-row justify-end gap-2 pt-2">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)} 
            disabled={isLoading}
            className="rounded-xl text-slate-500"
          >
            Batal
          </Button>
          <Button 
            onClick={handleAction}
            disabled={isLoading || !form.id_product || !form.name}
            className="bg-blue-600 hover:bg-blue-700 px-8 rounded-xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...
              </span>
            ) : (
              isEdit ? "Simpan Perubahan" : "Publikasikan"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}