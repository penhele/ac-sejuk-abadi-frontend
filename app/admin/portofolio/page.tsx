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
import { Plus, Pencil, Trash2, Briefcase } from "lucide-react";

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState([
    {
      title: "Instalasi AC Kantor",
      description: "Pemasangan AC di gedung perkantoran pusat",
      image: "https://ahliac.com/wp-content/uploads/2023/05/AC-Split-Duct-Murah.jpg",
    },
    {
      title: "Service AC Rumah",
      description: "Perawatan rutin AC rumah pelanggan residensial",
      image: "https://aquaelektronik.com/upload_files/1/eda45d31dc-pasang-ac.jpg",
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  // 🔹 HANDLE IMAGE (FileReader)
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  // OPEN MODAL TAMBAH
  const handleAdd = () => {
    setForm({ title: "", description: "", image: "" });
    setIsEdit(false);
    setShowModal(true);
  };

  // OPEN MODAL EDIT
  const handleEdit = (index: number) => {
    setForm(portfolios[index]);
    setEditIndex(index);
    setIsEdit(true);
    setShowModal(true);
  };

  // SIMPAN
  const handleSubmit = () => {
    if (!form.title || !form.description) return;

    if (isEdit && editIndex !== null) {
      const updated = [...portfolios];
      updated[editIndex] = form;
      setPortfolios(updated);
    } else {
      setPortfolios([...portfolios, form]);
    }

    setShowModal(false);
  };

  // HAPUS
  const handleDelete = (index: number) => {
    if (confirm("Hapus portofolio ini?")) {
      const updated = portfolios.filter((_, i) => i !== index);
      setPortfolios(updated);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Portofolio Pekerjaan</h1>
          <p className="text-muted-foreground">Dokumentasi hasil kerja tim AC Sejuk Abadi.</p>
        </div>

        <Button onClick={handleAdd} className="gap-2">
          <Plus className="w-4 h-4" /> Tambah Portofolio
        </Button>
      </div>

      {/* 🔥 LIST PORTOFOLIO (GRID CARD) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolios.map((item, i) => (
          <Card key={i} className="overflow-hidden border-2 hover:border-blue-500/20 transition-all">
            <CardContent className="p-0">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-44 object-cover"
                />
              ) : (
                <div className="w-full h-44 bg-muted flex items-center justify-center">
                   <Briefcase className="w-8 h-8 opacity-20" />
                </div>
              )}

              <div className="p-4">
                <h3 className="font-bold text-lg line-clamp-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2 h-10">
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
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Edit Portofolio" : "Tambah Portofolio"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nama Proyek</label>
              <Input
                placeholder="Misal: Pemasangan AC Gedung X"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Detail Pekerjaan</label>
              <Textarea
                placeholder="Ceritakan singkat proses pengerjaannya..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="min-h-25"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Foto Hasil Kerja</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="cursor-pointer"
              />
              
              {form.image && (
                <div className="mt-2 relative group">
                  <img
                    src={form.image}
                    alt="preview"
                    className="w-full h-36 object-cover rounded-md border"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                    <p className="text-white text-xs">Klik Ganti File untuk mengubah</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Batal
              </Button>
              <Button onClick={handleSubmit} disabled={!form.title || !form.description}>
                Simpan Portofolio
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}