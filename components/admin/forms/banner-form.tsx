"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Image as ImageIcon } from "lucide-react";

interface BannerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit: boolean;
  form: { title: string; description: string; image: string };
  setForm: (form: any) => void;
  preview: string | null;
  setPreview: (url: string | null) => void;
  onSubmit: () => void;
}

export function BannerForm({
  open,
  onOpenChange,
  isEdit,
  form,
  setForm,
  preview,
  setPreview,
  onSubmit,
}: BannerFormProps) {
  
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setForm({ ...form, image: url });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-112.5">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Banner" : "Tambah Banner Baru"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Judul Promo</label>
            <Input
              placeholder="Contoh: Promo Ramadhan"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Deskripsi Singkat</label>
            <Textarea
              placeholder="Jelaskan detail promo..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="h-24"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">File Gambar</label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="cursor-pointer"
            />
            {preview ? (
              <div className="mt-3 relative aspect-video rounded-md overflow-hidden border">
                <img src={preview} className="w-full h-full object-cover" alt="Preview" />
              </div>
            ) : (
              <div className="mt-3 flex flex-col items-center justify-center aspect-video rounded-md border border-dashed bg-muted/50 text-muted-foreground">
                <ImageIcon className="w-8 h-8 opacity-20" />
                <span className="text-xs mt-2">Belum ada gambar terpilih</span>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button onClick={onSubmit} disabled={!form.title || !form.image}>
              Simpan Banner
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}