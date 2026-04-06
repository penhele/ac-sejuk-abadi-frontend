"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageIcon, X, Tag, FileText } from "lucide-react";

interface ArticleFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit: boolean;
  // Sesuaikan field dengan DTO Backend
  form: { name: string; description: string; category: string; images?: any[] };
  setForm: (form: any) => void;
  onSubmit: (files: File[]) => void; // Kirim files asli ke parent
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

  // Handle multiple images
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + previews.length > 10) {
      alert("Maksimal 10 gambar");
      return;
    }

    setSelectedFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removePreview = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden flex flex-col h-[90vh]">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold">
            {isEdit ? "Edit Artikel" : "Tambah Artikel Baru"}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-4 py-2 pb-6">
            {/* Field: Name (Judul) */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" /> Judul Artikel *
              </label>
              <Input
                placeholder="Masukkan judul artikel..."
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl"
              />
            </div>

            {/* Field: Category */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-500" /> Kategori
              </label>
              <Input
                placeholder="Contoh: Maintenance, Promo, Tips"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="rounded-xl"
              />
            </div>

            {/* Field: Description (Isi Artikel) */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Isi Artikel / Deskripsi</label>
              <Textarea
                placeholder="Tulis detail artikel di sini..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="min-h-50 rounded-xl resize-none leading-relaxed"
              />
            </div>

            {/* Field: Images (Multiple) */}
            <div className="space-y-3">
              <label className="text-sm font-semibold">Galeri Gambar (Maks 10)</label>
              <div className="grid grid-cols-3 gap-3">
                {/* Previews dari file yang baru dipilih */}
                {previews.map((src, idx) => (
                  <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border group">
                    <img src={src} alt="preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePreview(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-lg"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {/* Input Button */}
                {previews.length < 10 && (
                  <label className="aspect-video rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-blue-400 transition-all">
                    <ImageIcon className="w-6 h-6 text-slate-400" />
                    <span className="text-[10px] mt-1 text-slate-500 font-medium">Tambah Foto</span>
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
            </div>
          </div>
        </ScrollArea>

        <div className="p-6 bg-slate-50 border-t flex justify-end gap-3 mt-auto">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl">
            Batal
          </Button>
          <Button 
            onClick={() => onSubmit(selectedFiles)} 
            disabled={!form.name || isLoading}
            className="bg-blue-600 hover:bg-blue-700 px-8 rounded-xl font-bold transition-all"
          >
            {isLoading ? "Memproses..." : isEdit ? "Simpan Perubahan" : "Posting Artikel"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}