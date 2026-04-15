"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ImageIcon, X, Tag, FileText, AlertCircle, Loader2 } from "lucide-react";

interface ArticleFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit: boolean;
  form: { 
    id: number | null; 
    name: string; 
    description: string; 
    category: string; 
    images?: any[] 
  };
  setForm: (form: any) => void;
  onSubmit: (files: File[]) => void; 
  isLoading?: boolean;
}

export function ArticleForm({
  open,
  onOpenChange,
  isEdit,
  form,
  setForm,
  onSubmit,
  isLoading
}: ArticleFormProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (!open) {
      previews.forEach(url => URL.revokeObjectURL(url));
      setPreviews([]);
      setSelectedFiles([]);
    }
  }, [open]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const existingCount = form.images?.length || 0;
    
    if (existingCount + selectedFiles.length + files.length > 10) {
      alert("Maksimal total 10 gambar per artikel");
      return;
    }

    setSelectedFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeNewPreview = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    const updatedImages = [...(form.images || [])];
    updatedImages.splice(index, 1);
    setForm({ ...form, images: updatedImages });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden flex flex-col h-[90vh] border-none shadow-2xl rounded-[2rem]">
        <DialogHeader className="p-8 pb-4 bg-white">
          <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
            {isEdit ? "Perbarui Artikel" : "Artikel Baru"}
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-sm">
            Pastikan konten artikel informatif dan bermanfaat bagi pelanggan.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-8 bg-white">
          <div className="space-y-8 py-4 pb-12">
            
            <div className="space-y-3">
              <label className="text-sm font-semibold flex items-center gap-2 text-slate-600">
                <FileText className="w-4 h-4" /> Judul Artikel
              </label>
              <Input
                placeholder="Masukkan judul artikel..."
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-12 rounded-xl border-slate-200 bg-slate-50/30 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold flex items-center gap-2 text-slate-600">
                <Tag className="w-4 h-4" /> Kategori
              </label>
              <Input
                placeholder="Contoh: Tips, Maintenance, Promo"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="h-12 rounded-xl border-slate-200 bg-slate-50/30 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-600">Isi Artikel</label>
              <Textarea
                placeholder="Tuliskan isi artikel secara detail..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="min-h-62.5 rounded-xl leading-relaxed border-slate-200 bg-slate-50/30 p-4 focus:border-blue-500 transition-all resize-none"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <label className="text-sm font-semibold text-slate-600">Dokumentasi Gambar</label>
                <span className="text-[12px] font-medium text-slate-400">
                  { (form.images?.length || 0) + selectedFiles.length } / 10
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {isEdit && form.images?.map((img, idx) => (
                  <div key={`cloud-${idx}`} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-100 group shadow-sm">
                    <img src={img.url || img} alt="cloud" className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-blue-600/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-[9px] font-bold text-white shadow-sm">
                      Cloud
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExistingImage(idx)}
                      className="absolute top-2 right-2 bg-white/90 text-red-500 rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {previews.map((src, idx) => (
                  <div key={`new-${idx}`} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-blue-100 group animate-in fade-in zoom-in-95 shadow-md">
                    <img src={src} alt="preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeNewPreview(idx)}
                      className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-1.5 shadow-md hover:bg-red-50 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {((form.images?.length || 0) + selectedFiles.length) < 10 && (
                  <label className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-blue-300 transition-all group">
                    <ImageIcon className="w-6 h-6 text-slate-300 group-hover:text-blue-500 transition-colors" />
                    <span className="text-[10px] mt-2 font-medium text-slate-400">Tambah Foto</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImage}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {((form.images?.length || 0) + selectedFiles.length) >= 10 && (
                <div className="flex items-center gap-2 text-amber-600 text-[11px] bg-amber-50 p-3 rounded-xl border border-amber-100">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Kapasitas gambar penuh (Maksimal 10).</span>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <div className="p-8 bg-slate-50/50 border-t flex justify-end gap-4">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)} 
            disabled={isLoading}
            className="rounded-xl px-6"
          >
            Batal
          </Button>
          <Button 
            onClick={() => onSubmit(selectedFiles)}
            disabled={!form.name || !form.description || isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl font-semibold shadow-lg shadow-blue-100 transition-all active:scale-95"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Memproses...
              </span>
            ) : isEdit ? "Simpan Perubahan" : "Terbitkan Artikel"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}