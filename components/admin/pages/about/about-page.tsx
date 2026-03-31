"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AboutCard } from "@/components/admin/shared/about-card";
import AboutDialog from "@/components/admin/AboutDialog"; // Pastikan path ini benar sesuai lokasimu

export default function AboutPage() {
  const [data, setData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const handleAdd = (item: any) => {
    setData([...data, item]);
  };

  const handleDelete = (index: number) => {
    if (confirm("Hapus data ini?")) {
      setData(data.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">About Us Management</h1>
          <p className="text-sm text-muted-foreground">Kelola info penghargaan, anggota, dan sponsor.</p>
        </div>

        <Button onClick={() => setOpen(true)} className="gap-2">
          + Tambah Data
        </Button>
      </div>

      {/* GRID CARD VIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.length === 0 ? (
          <p className="text-muted-foreground text-sm col-span-full text-center py-10 border-2 border-dashed rounded-xl">
            Belum ada data. Klik tombol "Tambah Data" untuk memulai.
          </p>
        ) : (
          data.map((item, i) => (
            <AboutCard 
              key={i} 
              item={item} 
              onDelete={() => handleDelete(i)} 
            />
          ))
        )}
      </div>

      <AboutDialog
        open={open}
        setOpen={setOpen}
        onSave={handleAdd}
      />
    </div>
  );
}