"use client";

import React, { useEffect } from "react";
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
import { ImageIcon, X, Tag, FileText, AlertCircle } from "lucide-react";

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
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [previews, setPreviews] = React.useState<string[]>([]);

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
    const totalCurrentImages = existingCount + selectedFiles.length + files.length;
    
    if (totalCurrentImages > 10) {
      alert("Maksimal total 10 gambar");
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden flex flex-col h-[90vh] border-none shadow-2xl rounded-[2rem]">
        <DialogHeader className="p-8 pb-4 bg-white">
          <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
            {isEdit ? "Perbarui Artikel" : "Artikel Baru"}
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-sm">
            Pastikan semua informasi yang Anda masukkan sudah benar sebelum disimpan.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-8 bg-white">
          <div className="space-y-8 py-4 pb-12">
            
            {/* Field: Judul */}
            <div className="space-y-3">
              <label className="text-sm font-semibold flex items-center gap-2 text-slate-600">
                <FileText className="w-4 h-4" /> Judul Artikel
              </label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-12 rounded-xl border-slate-200 focus:ring-0 focus:border-blue-500 transition-all bg-slate-50/30"
              />
            </div>

            {/* Field: Kategori */}
            <div className="space-y-3">
              <label className="text-sm font-semibold flex items-center gap-2 text-slate-600">
                <Tag className="w-4 h-4" /> Kategori
              </label>
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="h-12 rounded-xl border-slate-200 focus:border-blue-500 transition-all bg-slate-50/30"
              />
            </div>

            {/* Field: Isi/Deskripsi */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-600">Isi Artikel</label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="min-h-50 rounded-xl resize-none leading-relaxed border-slate-200 focus:border-blue-500 transition-all bg-slate-50/30 p-4"
              />
            </div>

            {/* Galeri */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <label className="text-sm font-semibold text-slate-600">Dokumentasi Gambar</label>
                <span className="text-[12px] font-medium text-slate-400">
                  { (form.images?.length || 0) + selectedFiles.length } / 10
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {/* Existing Images */}
                {isEdit && form.images?.map((img, idx) => (
                  <div key={`ex-${idx}`} className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 group">
                    <img src={img.url || img} alt="upload" className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all" />
                    <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-600">
                      Cloud
                    </div>
                  </div>
                ))}

                {/* New Previews */}
                {previews.map((src, idx) => (
                  <div key={`new-${idx}`} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-blue-100 group animate-in fade-in zoom-in-95">
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

                {/* Upload Button */}
                {((form.images?.length || 0) + selectedFiles.length) < 10 && (
                  <label className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-blue-300 transition-all group">
                    <ImageIcon className="w-6 h-6 text-slate-300 group-hover:text-blue-500 transition-colors" />
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
                <div className="flex items-center gap-2 text-red-500 text-[11px] bg-red-50/50 p-3 rounded-xl border border-red-100">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Kapasitas penyimpanan gambar untuk satu artikel telah penuh.</span>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        {/* Action Footer */}
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
            className="bg-slate-900 hover:bg-black text-white px-8 rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-20"
          >
            {isLoading ? "Memproses..." : isEdit ? "Simpan Perubahan" : "Simpan Artikel"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}