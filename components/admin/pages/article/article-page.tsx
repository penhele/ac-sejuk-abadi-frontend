"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, BookOpen } from "lucide-react";
import { ArticleCard } from "@/components/admin/shared/article-card";
import { ArticleForm } from "@/components/admin/forms/article-form";
import axios from "axios";

// Gunakan URL Deployment temanmu
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function ArticlePage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  
  // State form disesuaikan dengan CreateArticleDto
  const [form, setForm] = useState({ 
    id: null,
    name: "", 
    description: "", 
    category: "" 
  });

  // 1. Ambil Data dari API
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/articles`);
      setArticles(res.data);
    } catch (error) {
      console.error("Gagal load artikel:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // 2. Persiapan Tambah / Edit
  const handleAdd = () => {
    setIsEdit(false);
    setForm({ id: null, name: "", description: "", category: "" });
    setShowModal(true);
  };

  const handleEdit = (item: any) => {
    setIsEdit(true);
    setForm({
      id: item.id,
      name: item.name,
      description: item.description || "",
      category: item.category || ""
    });
    setShowModal(true);
  };

  // 3. Simpan Data (Text + Images)
  const handleSubmit = async (files: File[]) => {
    setActionLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      let articleId = form.id;

      // STEP 1: Simpan/Update Data Teks
      if (isEdit && articleId) {
        await axios.put(`${API_URL}/articles/${articleId}`, form, config);
      } else {
        const res = await axios.post(`${API_URL}/articles`, form, config);
        articleId = res.data.id;
      }

      // STEP 2: Upload Gambar (Jika ada file baru)
      if (files.length > 0 && articleId) {
        const formData = new FormData();
        files.forEach(file => formData.append("files", file)); // Key 'files' sesuai BE

        await axios.post(`${API_URL}/articles/${articleId}/images`, formData, {
          headers: { 
            ...config.headers, 
            "Content-Type": "multipart/form-data" 
          },
        });
      }

      setShowModal(false);
      fetchArticles(); // Refresh list
      alert("Artikel berhasil disimpan!");
    } catch (error: any) {
      alert(error.response?.data?.message || "Gagal menyimpan artikel.");
    } finally {
      setActionLoading(false);
    }
  };

  // 4. Hapus Artikel
  const handleDelete = async (id: number) => {
    if (!confirm("Hapus artikel ini selamanya?")) return;
    
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`${API_URL}/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchArticles();
    } catch (error) {
      alert("Gagal menghapus artikel.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <BookOpen className="text-blue-600" /> Manajemen Artikel
          </h1>
          <p className="text-slate-500 text-sm">Kelola konten edukasi untuk pelanggan.</p>
        </div>
        <Button onClick={handleAdd} className="gap-2 bg-blue-600 hover:bg-blue-700 rounded-xl">
          <Plus className="w-4 h-4" /> Tulis Artikel
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mb-2" />
          <p>Mengambil data...</p>
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((item) => (
            <ArticleCard 
              key={item.id} 
              item={item} 
              onEdit={() => handleEdit(item)} 
              onDelete={() => handleDelete(item.id)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-3xl text-slate-400 bg-slate-50">
          Belum ada artikel yang dipublikasikan.
        </div>
      )}

      <ArticleForm 
        open={showModal} 
        onOpenChange={setShowModal}
        isEdit={isEdit}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        isLoading={actionLoading}
      />
    </div>
  );
}