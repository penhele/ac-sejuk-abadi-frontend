"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, ImagePlus } from "lucide-react";

export default function AboutDialog({ open, setOpen, onSave }: any) {
  const [form, setForm] = useState({
    section: "penghargaan",
    title: "",
    description: "",
    images: [] as string[], // Ubah ke Array
  });

  // Handle Multi Image Upload
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    
    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          images: [...prev.images, reader.result as string],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  // Hapus satu gambar dari preview sebelum simpan
  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (!form.title || form.images.length === 0) return;
    
    onSave(form);
    setForm({
      section: "penghargaan",
      title: "",
      description: "",
      images: [],
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Tambah Data About</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Pilih Kategori</label>
            <select
              value={form.section}
              onChange={(e) => setForm({ ...form, section: e.target.value })}
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-ring"
            >
              <option value="penghargaan">Penghargaan</option>
              <option value="anggota">Anggota</option>
              <option value="detail">Detail</option>
              <option value="sponsor">Sponsor</option>
            </select>
          </div>

          <Input
            placeholder="Judul / Nama"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <Textarea
            placeholder="Deskripsi"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">Upload Gambar (Bisa banyak)</label>
            <div className="grid grid-cols-4 gap-2">
              {/* Preview Images */}
              {form.images.map((img, idx) => (
                <div key={idx} className="relative aspect-square border rounded-md overflow-hidden group">
                  <img src={img} className="object-cover w-full h-full" alt="preview" />
                  <button
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              
              {/* Upload Trigger */}
              <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-md aspect-square cursor-pointer hover:bg-muted transition">
                <ImagePlus className="w-6 h-6 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground mt-1">Tambah</span>
                <input 
                  type="file" 
                  multiple 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImages} 
                />
              </label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
          <Button onClick={handleSubmit}>Simpan Data</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}