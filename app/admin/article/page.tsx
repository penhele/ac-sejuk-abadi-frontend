"use client";

import React, { useState } from "react";
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
import { Plus, Pencil, Trash2 } from "lucide-react"; // Opsional: Untuk icon agar lebih manis

export default function ArticlePage() {
  // State Data
  const [articles, setArticles] = useState([
    {
      title: "Tips Perawatan AC Berkala",
      description: "Menjaga AC tetap dingin dan hemat listrik dengan cuci rutin.",
      image: "https://statik.unesa.ac.id/profileunesa_konten_statik%2Fuploads%2Fmesinft/thumbnail/6d99cd22-17c3-46a8-8e5a-ec05ba4f7534.jpg",
    },
  ]);

  // State UI & Form
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", description: "", image: "" });

  // Handler: Tambah
  const handleAdd = () => {
    setIsEdit(false);
    setForm({ title: "", description: "", image: "" });
    setShowModal(true);
  };

  // Handler: Edit
  const handleEdit = (index: number) => {
    setIsEdit(true);
    setEditIndex(index);
    setForm(articles[index]);
    setShowModal(true);
  };

  // Handler: Hapus
  const handleDelete = (index: number) => {
    if (confirm("Yakin ingin menghapus artikel ini?")) {
      setArticles(articles.filter((_, i) => i !== index));
    }
  };

  // Handler: Image Upload (Preview)
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

  // Handler: Submit
  const handleSubmit = () => {
    if (isEdit && editIndex !== null) {
      const updated = [...articles];
      updated[editIndex] = form;
      setArticles(updated);
    } else {
      setArticles([...articles, form]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Artikel</h1>
          <p className="text-muted-foreground">Kelola konten edukasi untuk pelanggan AC Sejuk Abadi.</p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="w-4 h-4" /> Tambah Artikel
        </Button>
      </div>

      {/* 🔥 LIST SECTION (CARD GRID) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((item, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-bold text-lg line-clamp-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {item.description}
                </p>

                <div className="mt-4 flex gap-2">
                  <Button
                    variant="secondary"
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

      {/* 🔥 MODAL SECTION (DIALOG SHADCN) */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
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
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Batal
              </Button>
              <Button onClick={handleSubmit}>
                {isEdit ? "Simpan Perubahan" : "Posting Artikel"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}