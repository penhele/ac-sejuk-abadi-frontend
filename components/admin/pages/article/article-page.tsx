"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, BookOpen } from "lucide-react";
import { ArticleCard } from "@/components/admin/shared/article-card";
import { ArticleForm } from "@/components/admin/forms/article-form";
import axios from "axios";
import { useRouter } from "next/navigation";

/**
 * PERBAIKAN CORS & ROUTING:
 * Menggunakan '/api-backend' sebagai base agar melewati proxy next.config.js.
 * Ditambah '/api' karena backend Vercel kamu membungkus rute di dalam folder tersebut.
 */
const API_URL = "/api-backend/api";

export default function ArticlePage() {
  const router = useRouter();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  
  const [form, setForm] = useState({ 
    id: null as number | null,
    name: "", 
    description: "", 
    category: "",
    images: [] as any[] 
  });

  /**
   * Mengambil token dari localStorage. 
   * Jika tidak ada, user langsung diarahkan ke login.
   */
  const getAuthConfig = useCallback(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (!token) {
      router.push("/login");
      return null;
    }
    return { headers: { Authorization: `Bearer ${token}` } };
  }, [router]);

  /**
   * Mengambil daftar artikel.
   */
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      // Endpoint final: /api-backend/api/articles
      const res = await axios.get(`${API_URL}/articles`);
      const result = res.data.data || res.data;
      setArticles(Array.isArray(result) ? result : []);
    } catch (error: any) {
      console.error("Gagal load artikel:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleAdd = () => {
    setIsEdit(false);
    setForm({ id: null, name: "", description: "", category: "", images: [] });
    setShowModal(true);
  };

  const handleEdit = (item: any) => {
    setIsEdit(true);
    setForm({
      id: item.id,
      name: item.name,
      description: item.description || "",
      category: item.category || "",
      images: item.images || []
    });
    setShowModal(true);
  };

  /**
   * Alur simpan data: Teks (POST/PUT) -> Gambar (POST)
   */
  const handleSubmit = async (files: File[]) => {
    const config = getAuthConfig();
    if (!config) return;

    setActionLoading(true);
    try {
      let articleId = form.id;
      const payload = {
        name: form.name,
        description: form.description,
        category: form.category
      };

      // 1. Simpan/Update Teks
      if (isEdit && articleId) {
        await axios.put(`${API_URL}/articles/${articleId}`, payload, config);
      } else {
        const res = await axios.post(`${API_URL}/articles`, payload, config);
        // Ambil ID dari response untuk upload gambar
        articleId = res.data.id || res.data.data?.id;
      }

      // 2. Upload Gambar jika ada file baru
      if (files.length > 0 && articleId) {
        const formData = new FormData();
        files.forEach(file => formData.append("files", file));

        await axios.post(`${API_URL}/articles/${articleId}/images`, formData, {
          headers: { 
            ...config.headers, 
            "Content-Type": "multipart/form-data" 
          },
        });
      }

      setShowModal(false);
      await fetchArticles(); 
      alert(isEdit ? "Perubahan disimpan!" : "Artikel diterbitkan!");
    } catch (error: any) {
      console.error("Submit Error:", error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        alert("Sesi berakhir.");
        localStorage.removeItem("access_token");
        router.push("/login");
      } else {
        alert(error.response?.data?.message || "Terjadi kesalahan sistem.");
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus artikel ini?")) return;
    
    const config = getAuthConfig();
    if (!config) return;

    try {
      await axios.delete(`${API_URL}/articles/${id}`, config);
      fetchArticles();
    } catch (error: any) {
      alert("Gagal menghapus artikel.");
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3 text-slate-900">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <BookOpen className="w-6 h-6" />
            </div>
            Manajemen Artikel
          </h1>
          <p className="text-slate-500 text-sm mt-1">Konten blog layanan AC.</p>
        </div>
        <Button 
          onClick={handleAdd} 
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-6 h-auto shadow-lg shadow-blue-100"
        >
          <Plus className="w-5 h-5 mr-2" />
          <span className="font-bold">Tulis Artikel</span>
        </Button>
      </div>

      <div className="h-px bg-slate-200 w-full" />

      {loading ? (
        <div className="flex flex-col items-center justify-center h-96">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          <p className="mt-4 text-slate-400">Memuat artikel...</p>
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((item) => (
            <div key={item.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ArticleCard 
                item={item} 
                onEdit={() => handleEdit(item)} 
                onDelete={() => handleDelete(item.id)} 
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-slate-200 rounded-[2.5rem] bg-slate-50/50">
          <BookOpen className="w-10 h-10 text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-900">Belum ada konten</h3>
          <Button variant="outline" onClick={handleAdd} className="mt-4 rounded-xl">
            Buat Sekarang
          </Button>
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