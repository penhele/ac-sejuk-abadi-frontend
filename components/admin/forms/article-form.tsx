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

interface ArticleFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit: boolean;
  form: { title: string; description: string; image: string };
  setForm: (form: any) => void;
  onSubmit: () => void;
}

export function ArticleForm({ 
  open, 
  onOpenChange, 
  isEdit, 
  form, 
  setForm, 
  onSubmit 
}: ArticleFormProps) {

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Artikel" : "Tambah Artikel Baru"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Judul Artikel</label>
            <Input
              placeholder="Masukkan judul..."
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Deskripsi Singkat</label>
            <Textarea
              placeholder="Tulis deskripsi di sini..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Gambar Thumbnail</label>
            <Input type="file" accept="image/*" onChange={handleImage} />
            {form.image && (
              <div className="mt-2 relative">
                <img
                  src={form.image}
                  alt="preview"
                  className="w-full h-32 object-cover rounded-md border"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button onClick={onSubmit}>
              {isEdit ? "Simpan Perubahan" : "Posting Artikel"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}