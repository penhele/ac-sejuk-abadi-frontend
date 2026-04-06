"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { PortfolioForm } from "@/components/admin/forms/portofolio-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Portfolio } from "@/types/portofolio";

const API_URL = "http://localhost:3000/projects";

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState<Partial<Portfolio>>({ images: [] });
  const [loading, setLoading] = useState(false);

  // 1. Fetch Data
  const fetchProjects = async () => {
    const res = await axios.get(API_URL);
    setProjects(res.data);
  };

  useEffect(() => { fetchProjects(); }, []);

  // 2. Handle Logic Simpan (2 Tahap sesuai BE)
  const handleSave = async (files: File[]) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      let projectId = form.id;

      // STEP 1: Simpan Data Teks (Create/Update)
      if (isEdit && projectId) {
        await axios.put(`${API_URL}/${projectId}`, form, config);
      } else {
        const res = await axios.post(API_URL, form, config);
        projectId = res.data.id; // Ambil ID yang baru dibuat
      }

      // STEP 2: Upload Gambar (Hanya jika ada file baru)
      if (files.length > 0 && projectId) {
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));
        
        await axios.post(`${API_URL}/${projectId}/images`, formData, {
          headers: {
            ...config.headers,
            'Content-Type': 'multipart/form-data',
          }
        });
      }

      alert("Portofolio Berhasil Disimpan!");
      setShowModal(false);
      fetchProjects();
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manajemen Portofolio</h1>
        <Button onClick={() => { setIsEdit(false); setForm({ images: [] }); setShowModal(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Tambah Proyek
        </Button>
      </div>

      {/* Render list project Anda di sini (Tabel/Card) */}
      
      <PortfolioForm 
        open={showModal} 
        onOpenChange={setShowModal}
        form={form}
        setForm={setForm}
        onSubmit={handleSave}
        isEdit={isEdit}
        isLoading={loading}
      />
    </div>
  );
}