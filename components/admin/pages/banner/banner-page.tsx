"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BannerCard } from "@/components/admin/shared/banner-card";
import { BannerForm } from "@/components/admin/forms/banner-form";

export default function BannerPage() {
  const [banners, setBanners] = useState([
    {
      title: "Promo Installer AC!!!",
      description: "Diskon hingga 30% untuk semua tipe AC",
      image: "https://pbs.twimg.com/media/GSMpM-taoAAFZA_?format=jpg&name=4096x4096",
    },
  ]);

  const [form, setForm] = useState({ title: "", description: "", image: "" });
  const [preview, setPreview] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleAdd = () => {
    setForm({ title: "", description: "", image: "" });
    setPreview(null);
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEdit = (index: number) => {
    setForm(banners[index]);
    setPreview(banners[index].image);
    setEditIndex(index);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (isEdit && editIndex !== null) {
      const updated = [...banners];
      updated[editIndex] = form;
      setBanners(updated);
    } else {
      setBanners([...banners, form]);
    }
    setShowModal(false);
  };

  const handleDelete = (index: number) => {
    if (confirm("Hapus banner ini?")) {
      setBanners(banners.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Banner Iklan</h1>
          <p className="text-muted-foreground">Kelola promo yang muncul di slider depan.</p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="w-4 h-4" /> Tambah Banner
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.map((item, i) => (
          <BannerCard 
            key={i} 
            item={item} 
            onEdit={() => handleEdit(i)} 
            onDelete={() => handleDelete(i)} 
          />
        ))}
      </div>

      <BannerForm 
        open={showModal} 
        onOpenChange={setShowModal}
        isEdit={isEdit}
        form={form}
        setForm={setForm}
        preview={preview}
        setPreview={setPreview}
        onSubmit={handleSubmit}
      />
    </div>
  );
}