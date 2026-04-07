"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { BannerCard } from "@/components/admin/shared/banner-card";
import { BannerForm, type Banner } from "@/components/admin/forms/banner-form";
import axios from "axios"; // Pastikan sudah install axios

// Gunakan URL dari .env atau langsung jika belum ada
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function BannerPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  
  // State Form disesuaikan dengan DTO Backend
  const [form, setForm] = useState<Partial<Banner>>({
    id_brand: 0,
    name: "",
    category: "",
    start_date: "",
    end_date: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 1. Fetch Data dari Backend
  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/banners`);
      setBanners(res.data);
    } catch (error) {
      console.error("Gagal mengambil banner:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // 2. Handle Logic Tambah & Edit (Reset State)
  const handleAdd = () => {
    setForm({
      id_brand: 0,
      name: "",
      category: "",
      start_date: "",
      end_date: "",
    });
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEdit = (item: Banner) => {
    setForm(item);
    setIsEdit(true);
    setShowModal(true);
  };

  // 3. Handle Submit (2-Step sesuai BE)
  const handleSubmit = async (file: File | null) => {
    setActionLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      let bannerId = form.id;

      // STEP 1: Simpan Data Text
      if (isEdit && bannerId) {
        await axios.put(`${API_URL}/banners/${bannerId}`, form, config);
      } else {
        const res = await axios.post(`${API_URL}/banners`, form, config);
        bannerId = res.data.id;
      }

      // STEP 2: Upload Gambar (Hanya jika ada file baru)
      if (file && bannerId) {
        const formData = new FormData();
        formData.append("file", file); // Key harus 'file' sesuai Controller BE
        await axios.post(`${API_URL}/banners/${bannerId}/image`, formData, {
          headers: { 
            ...config.headers,
            "Content-Type": "multipart/form-data" 
          },
        });
      }

      alert("Banner berhasil disimpan!");
      setShowModal(false);
      fetchBanners(); // Refresh list
    } catch (error: any) {
      alert(error.response?.data?.message || "Terjadi kesalahan saat menyimpan.");
    } finally {
      setActionLoading(false);
    }
  };

  // 4. Handle Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Hapus banner ini secara permanen?")) return;
    
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`${API_URL}/banners/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBanners();
    } catch (error) {
      alert("Gagal menghapus banner.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Banner Iklan</h1>
          <p className="text-slate-500">Kelola promo yang muncul di slider depan.</p>
        </div>
        <Button onClick={handleAdd} className="gap-2 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md">
          <Plus className="w-4 h-4" /> Tambah Banner
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
          <Loader2 className="w-10 h-10 animate-spin mb-2" />
          <p>Memuat data banner...</p>
        </div>
      ) : banners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((item) => (
            <BannerCard 
              key={item.id} 
              item={item} 
              onEdit={() => handleEdit(item)} 
              onDelete={() => handleDelete(item.id!)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-3xl text-slate-400">
          Belum ada banner aktif.
        </div>
      )}

      <BannerForm 
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