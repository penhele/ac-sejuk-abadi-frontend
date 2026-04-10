"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/src/services/api"; 
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus, RefreshCw, Users } from "lucide-react";
import AboutDialog from "@/components/admin/AboutDialog";
// Asumsi AboutCard juga perlu sedikit penyesuaian untuk menampilkan name & role
import { AboutCard } from "@/components/admin/shared/about-card";

export default function AboutPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // 1. Fetch Data Staff dari API
  const fetchStaff = useCallback(async () => {
    setLoading(true);
    try {
      // Sesuaikan endpoint ini dengan backend Anda (misal /staff atau /about)
      const res = await api.get("/staff"); 
      const rawData = res.data?.data || res.data;
      setData(Array.isArray(rawData) ? rawData : []);
    } catch (error) {
      console.error("Error fetching staff:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  // 2. Simpan Data Staff Baru
  const handleAdd = async (item: any) => {
    try {
      await api.post("/staff", item);
      alert("Data staff berhasil ditambahkan!");
      fetchStaff(); // Refresh data
    } catch (error) {
      alert("Gagal menambahkan staff.");
    }
  };

  // 3. Hapus Data Staff
  const handleDelete = async (id: number | string) => {
    if (!confirm("Hapus data staff ini?")) return;
    try {
      await api.delete(`/staff/${id}`);
      fetchStaff();
    } catch (error) {
      alert("Gagal menghapus data.");
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Management Staff</h1>
          <p className="text-slate-500 text-sm italic">Kelola profil anggota tim dan jabatan mereka.</p>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" onClick={fetchStaff} disabled={loading} className="rounded-xl">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Sync
          </Button>
          <Button onClick={() => setOpen(true)} className="bg-blue-600 hover:bg-blue-700 rounded-xl gap-2">
            <UserPlus className="w-4 h-4" /> Tambah Staff
          </Button>
        </div>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="text-slate-400">Memuat profil staff...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-32 border-2 border-dashed rounded-[2.5rem] bg-slate-50/50 text-slate-400 border-slate-200">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-20 text-slate-900" />
          <h3 className="font-bold text-slate-900">Belum Ada Staff</h3>
          <p className="text-xs max-w-xs mx-auto mt-2">Daftar staff masih kosong. Silakan tambah staff baru untuk ditampilkan di halaman About.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((item) => (
            <AboutCard 
              key={item.id} 
              item={item} 
              onDelete={() => handleDelete(item.id)} 
            />
          ))}
        </div>
      )}

      {/* Dialog Form */}
      <AboutDialog
        open={open}
        setOpen={setOpen}
        onSave={handleAdd}
      />
    </div>
  );
}