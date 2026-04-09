"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/src/services/api"; 
import { PortfolioForm } from "@/components/admin/forms/portofolio-form";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, RefreshCw, Briefcase } from "lucide-react";
import { Portfolio } from "@/types/portofolio";

const initialForm: Partial<Portfolio> = {
  id_product: "",
  name: "",
  description: "",
  date: new Date().toISOString(),
  location: "",
  category: "interior",
  images: []
};

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [form, setForm] = useState<Partial<Portfolio>>(initialForm);

  // Gunakan useCallback agar fungsi stabil dan tidak memicu useEffect terus-menerus
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/projects");
      const result = res.data?.data || res.data;
      setProjects(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Gagal mengambil data proyek:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSave = async (files: File[]) => {
    // Validasi Dasar: Pastikan id_product terisi (Penting!)
    if (!form.id_product) {
      alert("Pilih produk terlebih dahulu!");
      return;
    }

    setActionLoading(true);

    // STRATEGI MEMBERSIHKAN PAYLOAD
    // Kita buat objek baru tanpa 'images' dan 'id' (untuk POST) agar sama ringannya dengan fitur diskon
    const payload = {
      id_product: form.id_product,
      name: form.name,
      description: form.description,
      date: form.date,
      location: form.location,
      category: form.category
    };

    try {
      let projectId = form.id;

      // STEP 1: Simpan Data Teks
      if (isEdit && projectId) {
        await api.put(`/projects/${projectId}`, payload);
      } else {
        const res = await api.post("/projects", payload);
        // Ambil ID dari response untuk lanjut ke upload gambar
        projectId = res.data?.data?.id || res.data?.id;
      }

      // STEP 2: Upload Gambar (Hanya jika ada file baru dan ID valid)
      if (files.length > 0 && projectId) {
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));

        await api.post(`/projects/${projectId}/images`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Data berhasil tersimpan!");
      setShowModal(false);
      fetchProjects(); 
    } catch (error: any) {
      console.error("DETEKSI ERROR:", error.response?.data || error.message);
      alert(`Gagal: ${error.response?.data?.message || "Internal Server Error"}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Hapus portofolio ini secara permanen?")) return;
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    } catch (error) {
      alert("Gagal menghapus proyek.");
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Portofolio</h1>
          <p className="text-muted-foreground italic text-sm">Manajemen konten proyek aktif</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={fetchProjects} disabled={loading} className="rounded-xl">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Sync
          </Button>
          <Button 
            onClick={() => { 
              setIsEdit(false); 
              setForm(initialForm); 
              setShowModal(true); 
            }}
            className="bg-blue-600 hover:bg-blue-700 shadow-md rounded-xl"
          >
            <Plus className="w-4 h-4 mr-2" /> Tambah Proyek
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          <p className="text-slate-500 animate-pulse">Menghubungi Database...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-32 border-2 border-dashed rounded-[2.5rem] bg-slate-50/50 text-slate-400">
          <Briefcase className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">Database Kosong</p>
          <p className="text-sm">Silakan tambah proyek baru.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((item) => (
            <div key={item.id} className="group border rounded-3xl p-4 hover:shadow-xl transition-all bg-white relative border-slate-100">
              <div className="aspect-video rounded-2xl bg-slate-100 mb-4 overflow-hidden">
                {item.images && item.images.length > 0 ? (
                  <img 
                    src={item.images[0]} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">No Image</div>
                )}
              </div>
              <div className="px-2">
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{item.category}</span>
                <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{item.name}</h3>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">{item.description}</p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-xl w-full"
                    onClick={() => { setForm(item); setIsEdit(true); setShowModal(true); }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="rounded-xl text-red-500 hover:bg-red-50"
                    onClick={() => handleDelete(item.id!)}
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <PortfolioForm 
        open={showModal} 
        onOpenChange={setShowModal}
        form={form}
        setForm={setForm}
        onSubmit={handleSave}
        isEdit={isEdit}
        isLoading={actionLoading}
      />
    </div>
  );
}