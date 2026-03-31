"use client";

import { useState } from "react";
// Tambahkan LayoutGrid di sini
import { Plus, LayoutGrid } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { PortfolioForm, Portfolio } from "@/components/admin/forms/portofolio-form";
import { PortfolioCard } from "@/components/admin/shared/portofolio-card";

export default function PortfolioPage() {
  // ... rest of your code (state and handlers)
  
  // State untuk menampung daftar portofolio (Review List)
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  
  // State untuk manajemen Modal & Form
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [form, setForm] = useState<Portfolio>({ 
    title: "", 
    description: "", 
    images: [] 
  });

  const handleOpenAdd = () => {
    setForm({ title: "", description: "", images: [] });
    setIsEdit(false);
    setShowModal(true);
  };

  const handleOpenEdit = (index: number) => {
    setForm(portfolios[index]);
    setSelectedIndex(index);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleSave = () => {
    if (isEdit && selectedIndex !== null) {
      const updated = [...portfolios];
      updated[selectedIndex] = form;
      setPortfolios(updated);
    } else {
      setPortfolios([form, ...portfolios]);
    }
    setShowModal(false);
  };

  const handleDelete = (index: number) => {
    if (confirm("Hapus portofolio ini?")) {
      setPortfolios(portfolios.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Manajemen Portofolio</h1>
          <p className="text-slate-500 mt-1 text-sm">Review dan kelola hasil pekerjaan yang ditampilkan ke publik.</p>
        </div>
        <Button onClick={handleOpenAdd} className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 h-11 shadow-lg shadow-blue-100">
          <Plus className="w-5 h-5 mr-2" /> Tambah Proyek
        </Button>
      </div>

      {/* REVIEW SECTION (GRID LIST) */}
      {portfolios.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {portfolios.map((item, index) => (
            <PortfolioCard 
              key={index} 
              item={item} 
              onEdit={() => handleOpenEdit(index)} 
              onDelete={() => handleDelete(index)} 
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed rounded-3xl bg-slate-50/50">
          <div className="bg-white p-4 rounded-full shadow-sm mb-4">
            {/* Sekarang LayoutGrid sudah ter-import dan bisa digunakan */}
            <LayoutGrid className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Belum Ada Data</h3>
          <p className="text-slate-500 text-sm max-w-60 text-center mt-1">
            Klik tombol "Tambah Proyek" untuk membuat review portofolio pertama Anda.
          </p>
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
      />
    </div>
  );
}