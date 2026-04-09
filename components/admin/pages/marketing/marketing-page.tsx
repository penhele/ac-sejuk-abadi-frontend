"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tag, Loader2, RefreshCw, Plus } from "lucide-react";
import { PromoItem } from "@/types/marketing";
import { DiscountCard } from "@/components/admin/shared/marketing-card";
import { MarketingForm } from "@/components/admin/forms/marketing-form";
import api from "@/src/services/api"; 

export default function MarketingPage() {
  // --- Data States ---
  const [discounts, setDiscounts] = useState<PromoItem[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  // --- UI States ---
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [form, setForm] = useState<Partial<PromoItem>>({});

  // 1. Fetch Data Diskon
  const fetchData = async () => {
    setIsFetching(true);
    try {
      const res = await api.get("/discounts");
      const result = res.data.data || res.data;
      setDiscounts(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Gagal mengambil data diskon:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Handler Modal
  const openModal = (item: PromoItem | null = null) => {
    if (item) {
      setIsEdit(true);
      setForm({ ...item }); 
    } else {
      setIsEdit(false);
      setForm({
        id_product: "",
        price: 0,
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString()
      });
    }
    setShowModal(true);
  };

  // 3. Handle Simpan (POST & PUT)
  const handleSave = async () => {
    setIsLoading(true);
    
    const payload = {
      ...form,
      price: Number(form.price),
      id_product: form.id_product,
    };

    try {
      if (isEdit && form.id) {
        await api.put(`/discounts/${form.id}`, payload);
      } else {
        await api.post("/discounts", payload);
      }

      setShowModal(false);
      alert("Berhasil menyimpan data promo!");
      fetchData(); 
    } catch (error: any) {
      console.error("Gagal menyimpan:", error.response?.data);
      alert(`Gagal: ${error.response?.data?.message || "Terjadi kesalahan server"}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Handle Delete
  const deleteItem = async (id: number | string | undefined) => {
    if (!id || !confirm("Hapus promo ini secara permanen?")) return;
    
    try {
      await api.delete(`/discounts/${id}`);
      alert("Promo berhasil dihapus");
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.message || "Gagal menghapus data.");
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Pemasaran</h1>
          <p className="text-muted-foreground italic text-sm">Kelola daftar promo diskon produk AC.</p>
        </div>
        <Button variant="outline" onClick={fetchData} disabled={isFetching} className="rounded-xl shadow-sm">
          <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? "animate-spin" : ""}`} /> Refresh Data
        </Button>
      </div>

      {isFetching ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="text-slate-500 animate-pulse">Memuat data diskon...</p>
        </div>
      ) : (
        <section className="space-y-4">
          <div className="flex justify-between items-center border-b pb-4">
            <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Tag className="text-blue-600 w-5 h-5" />
              </div>
              Promo Diskon Aktif
            </div>
            <Button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700 shadow-md rounded-xl transition-all active:scale-95">
              <Plus className="w-4 h-4 mr-1" /> Tambah Diskon
            </Button>
          </div>

          {discounts.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed rounded-3xl text-slate-400 bg-slate-50/50">
              <Tag className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="font-medium">Belum ada promo diskon yang dibuat.</p>
              <p className="text-xs">Klik "Tambah Diskon" untuk membuat promo baru.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {discounts.map((item) => (
                <DiscountCard 
                  key={item.id} 
                  item={item} 
                  onEdit={() => openModal(item)} 
                  onDelete={() => deleteItem(item.id)} 
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Form Modal */}
      <MarketingForm 
        open={showModal} 
        onOpenChange={setShowModal} 
        type="diskon" 
        isEdit={isEdit} 
        form={form} 
        setForm={setForm} 
        onSubmit={handleSave} 
        isLoading={isLoading} 
      />
    </div>
  );
}