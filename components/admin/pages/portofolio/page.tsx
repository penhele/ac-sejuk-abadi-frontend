"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/src/services/api"; 
import { PortfolioForm } from "@/components/admin/forms/portofolio-form";
import { PortfolioCard } from "@/components/admin/shared/portofolio-card";
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

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/projects?timestamp=${new Date().getTime()}`);
      const rawData = res.data?.data || res.data;
      const finalArray = Array.isArray(rawData) ? rawData : [];
      setProjects(finalArray);
    } catch (error: any) {
      console.error("--- API ERROR ---", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSave = async () => {
    if (!form.id_product || form.id_product.trim() === "") {
      alert("ID Produk wajib diisi!");
      return;
    }

    setActionLoading(true);
    try {
      if (isEdit && form.id) {
        await api.put(`/projects/${form.id}`, form);
      } else {
        await api.post("/projects", form);
      }
      setShowModal(false);
      await fetchProjects(); 
    } catch (error: any) {
      alert(`Gagal menyimpan: ${error.response?.data?.message || "Kesalahan Server"}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Hapus proyek ini secara permanen?")) return;
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    } catch (error) {
      alert("Gagal menghapus data.");
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto font-sans">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Portofolio</h1>
          <p className="text-slate-500 text-sm italic">Kelola proyek dan publikasi aset.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" onClick={fetchProjects} disabled={loading} className="flex-1 sm:flex-none rounded-xl">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Sync
          </Button>
          <Button 
            onClick={() => { setIsEdit(false); setForm(initialForm); setShowModal(true); }}
            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 rounded-xl"
          >
            <Plus className="w-4 h-4 mr-2" /> Tambah Proyek
          </Button>
        </div>
      </div>

      {/* CONTENT SECTION */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="text-slate-400 animate-pulse">Menghubungkan ke database...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-32 border-2 border-dashed rounded-[2.5rem] bg-slate-50/50 text-slate-400 border-slate-200">
          <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-20 text-slate-900" />
          <h3 className="font-bold text-slate-900">Belum Ada Proyek</h3>
          <p className="text-xs max-w-xs mx-auto mt-2">Database kosong atau koneksi ke /projects terputus.</p>
        </div>
      ) : (
        /* GRID MENGGUNAKAN PortfolioCard YANG SUDAH DIPERBAIKI */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((item) => (
            <PortfolioCard 
              key={item.id}
              item={item}
              onEdit={() => {
                setForm(item);
                setIsEdit(true);
                setShowModal(true);
              }}
              onDelete={() => handleDelete(item.id!)}
            />
          ))}
        </div>
      )}

      {/* MODAL FORM */}
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