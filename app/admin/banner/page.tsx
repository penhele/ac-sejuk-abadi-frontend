"use client";

import { useState } from "react";
// 🔥 IMPORT SHADCN COMPONENTS
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";

export default function BannerPage() {
  const [banners, setBanners] = useState([
    {
      title: "Promo Installer AC!!!",
      description: "Diskon hingga 30% untuk semua tipe AC",
      image: "https://pbs.twimg.com/media/GSMpM-taoAAFZA_?format=jpg&name=4096x4096",
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  // ================= HANDLE IMAGE =================
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setForm({ ...form, image: url });
    }
  };

  // ================= OPEN TAMBAH =================
  const handleAdd = () => {
    setForm({ title: "", description: "", image: "" });
    setPreview(null);
    setIsEdit(false);
    setShowModal(true);
  };

  // ================= OPEN EDIT =================
  const handleEdit = (index: number) => {
    setForm(banners[index]);
    setPreview(banners[index].image);
    setEditIndex(index);
    setIsEdit(true);
    setShowModal(true);
  };

  // ================= SUBMIT =================
  const handleSubmit = () => {
    if (!form.title || !form.description || !form.image) return;

    if (isEdit && editIndex !== null) {
      const updated = [...banners];
      updated[editIndex] = form;
      setBanners(updated);
    } else {
      setBanners([...banners, form]);
    }

    setShowModal(false);
  };

  // ================= DELETE =================
  const handleDelete = (index: number) => {
    if (confirm("Hapus banner ini?")) {
      const updated = banners.filter((_, i) => i !== index);
      setBanners(updated);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Banner Iklan</h1>
          <p className="text-muted-foreground">Kelola promo yang muncul di slider depan.</p>
        </div>

        <Button onClick={handleAdd} className="gap-2">
          <Plus className="w-4 h-4" /> Tambah Banner
        </Button>
      </div>

      {/* 🔥 LIST BANNER (CARD SHADCN) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.map((item, i) => (
          <Card key={i} className="overflow-hidden group">
            <CardContent className="p-0">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg line-clamp-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {item.description}
                </p>

                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => handleEdit(i)}
                  >
                    <Pencil className="w-3 h-3" /> Edit
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => handleDelete(i)}
                  >
                    <Trash2 className="w-3 h-3" /> Hapus
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 🔥 MODAL FORM (DIALOG SHADCN) */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
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
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Batal
              </Button>
              <Button onClick={handleSubmit} disabled={!form.title || !form.image}>
                Simpan Banner
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}