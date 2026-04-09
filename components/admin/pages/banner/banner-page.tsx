"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, RefreshCw, Image as ImageIcon } from "lucide-react";
import { BannerCard } from "@/components/admin/shared/banner-card";
import { BannerForm, type Banner } from "@/components/admin/forms/banner-form";
// Menggunakan instance api yang sudah ada (services/api) agar header auth otomatis jika sudah di-setup
import api from "@/src/services/api"; 

export default function BannerPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  
  // State Form diselaraskan dengan CURL DTO
  const initialForm: Partial<Banner> = {
    id_brand: 0,
    name: "",
    category: "promo", // Default category sesuai contoh curl
    start_date: new Date().toISOString(),
    end_date: new Date().toISOString(),
  };

  const [form, setForm] = useState<Partial<Banner>>(initialForm);
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 1. Fetch Data
  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await api.get("/banners");
      // Menangani jika backend membungkus response dalam properti 'data'
      const result = res.data.data || res.data;
      setBanners(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Gagal mengambil banner:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // 2. Handlers
  const handleAdd = () => {
    setForm(initialForm);
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEdit = (item: Banner) => {
    setForm(item);
    setIsEdit(true);
    setShowModal(true);
  };

  // 3. Submit (Sync dengan logic 2-step Backend)
  const handleSubmit = async (file: File | null) => {
    setActionLoading(true);
    try {
      let bannerId = form.id;

      // STEP 1: Payload Data (id_brand dipastikan Number)
      const payload = {
        ...form,
        id_brand: Number(form.id_brand)
      };

      if (isEdit && bannerId) {
        await api.put(`/banners/${bannerId}`, payload);
      } else {
        const res = await api.post("/banners", payload);
        // Ambil ID dari hasil create untuk upload gambar
        bannerId = res.data.data?.id || res.data.id;
      }

      // STEP 2: Upload Gambar (Hanya jika user memilih file baru)
      if (file && bannerId) {
        const formData = new FormData();
        formData.append("file", file);
        await api.post(`/banners/${bannerId}/image`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Banner berhasil disimpan!");
      setShowModal(false);
      fetchBanners();
    } catch (error: any) {
      const msg = error.response?.data?.message || "Gagal menyimpan banner.";
      alert(`Error: ${msg}`);
    } finally {
      setActionLoading(false);
    }
  };

  // 4. Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Hapus banner ini secara permanen?")) return;
    try {
      await api.delete(`/banners/${id}`);
      alert("Banner dihapus");
      fetchBanners();
    } catch (error) {
      alert("Gagal menghapus banner.");
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Banner Iklan</h1>
          <p className="text-muted-foreground italic text-sm">Kelola visual promo slider pada halaman utama aplikasi.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchBanners} disabled={loading} className="rounded-xl">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Button onClick={handleAdd} className="gap-2 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all active:scale-95">
            <Plus className="w-4 h-4" /> Tambah Banner
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
          <p className="animate-pulse font-medium">Sinkronisasi data banner...</p>
        </div>
      ) : banners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <div className="text-center py-32 border-2 border-dashed rounded-[2rem] text-slate-400 bg-slate-50/50">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">Media Gallery Kosong</p>
          <p className="text-sm">Belum ada banner promo yang terunggah.</p>
        </div>
      )}

      {/* Form Modal */}
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