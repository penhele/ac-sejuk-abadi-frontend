"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ArticleCard } from "@/components/admin/shared/article-card";
import { ArticleForm } from "@/components/admin/forms/article-form";

export default function ArticlePage() {
  const [articles, setArticles] = useState([
    {
      title: "Tips Perawatan AC Berkala",
      description: "Menjaga AC tetap dingin dan hemat listrik dengan cuci rutin.",
      image: "https://statik.unesa.ac.id/profileunesa_konten_statik%2Fuploads%2Fmesinft/thumbnail/6d99cd22-17c3-46a8-8e5a-ec05ba4f7534.jpg",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", description: "", image: "" });

  const handleAdd = () => {
    setIsEdit(false);
    setForm({ title: "", description: "", image: "" });
    setShowModal(true);
  };

  const handleEdit = (index: number) => {
    setIsEdit(true);
    setEditIndex(index);
    setForm(articles[index]);
    setShowModal(true);
  };

  const handleDelete = (index: number) => {
    if (confirm("Yakin ingin menghapus artikel ini?")) {
      setArticles(articles.filter((_, i) => i !== index));
    }
  };

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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Artikel</h1>
          <p className="text-muted-foreground">Kelola konten edukasi untuk pelanggan.</p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="w-4 h-4" /> Tambah Artikel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((item, i) => (
          <ArticleCard 
            key={i} 
            item={item} 
            onEdit={() => handleEdit(i)} 
            onDelete={() => handleDelete(i)} 
          />
        ))}
      </div>

      <ArticleForm 
        open={showModal} 
        onOpenChange={setShowModal}
        isEdit={isEdit}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
      />
    </div>
  );
}