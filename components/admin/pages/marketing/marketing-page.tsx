"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Megaphone, Tag } from "lucide-react";
import { PromoItem, MarketingType } from "@/types/marketing";
import { DiscountCard, NewsCard } from "@/components/admin/shared/marketing-card";
import { MarketingForm } from "@/components/admin/forms/marketing-form";

export default function MarketingPage() {
  // Data States
  const [discounts, setDiscounts] = useState<PromoItem[]>([
    { title: "Diskon Lebaran", percent: 20, description: "Promo spesial lebaran.", image: "https://awsimages.detik.net.id/community/media/visual/2026/01/17/ac-transmart-full-day-sale-1768598208540_43.jpeg?w=600&q=90" },
  ]);
  const [flashNews, setFlashNews] = useState<PromoItem[]>([
    { title: "Promo hari ini!", description: "Diskon unit Gree.", image: "https://www.permatateknik.com/wp-content/uploads/2018/08/AC-SPLIT-DAIKIN-INVERTER-FLASH-R32-AC-Terbaik-Hemat-Listrik-1-1.jpg" },
  ]);

  // UI States
  const [activeType, setActiveType] = useState<MarketingType>("diskon");
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<PromoItem>>({});

  // Handlers
  const openModal = (t: MarketingType, index: number | null = null) => {
    setActiveType(t);
    if (index !== null) {
      setIsEdit(true);
      setEditIndex(index);
      setForm(t === "diskon" ? discounts[index] : flashNews[index]);
    } else {
      setIsEdit(false);
      setForm({});
    }
    setShowModal(true);
  };

  const handleSave = () => {
    const list = activeType === "diskon" ? [...discounts] : [...flashNews];
    const updateFn = activeType === "diskon" ? setDiscounts : setFlashNews;

    if (isEdit && editIndex !== null) {
      list[editIndex] = form as PromoItem;
    } else {
      list.push(form as PromoItem);
    }

    updateFn(list);
    setShowModal(false);
  };

  const deleteItem = (t: MarketingType, index: number) => {
    if (!confirm("Hapus konten ini?")) return;
    if (t === "diskon") setDiscounts(discounts.filter((_, i) => i !== index));
    else setFlashNews(flashNews.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 space-y-10 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pemasaran</h1>
        <p className="text-slate-500">Kelola promo diskon dan flash news untuk landing page.</p>
      </div>

      {/* DISKON SECTION */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <div className="flex items-center gap-2 font-bold text-lg"><Tag className="text-blue-600 w-5 h-5" /> Promo Diskon</div>
          <Button size="sm" onClick={() => openModal("diskon")} className="bg-blue-600"><Plus className="w-4 h-4 mr-1" /> Tambah</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {discounts.map((item, i) => (
            <DiscountCard key={i} item={item} onEdit={() => openModal("diskon", i)} onDelete={() => deleteItem("diskon", i)} />
          ))}
        </div>
      </section>

      {/* FLASH NEWS SECTION */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <div className="flex items-center gap-2 font-bold text-lg"><Megaphone className="text-orange-600 w-5 h-5" /> Flash News</div>
          <Button size="sm" variant="outline" onClick={() => openModal("news")}><Plus className="w-4 h-4 mr-1" /> Tambah</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {flashNews.map((item, i) => (
            <NewsCard key={i} item={item} onEdit={() => openModal("news", i)} onDelete={() => deleteItem("news", i)} />
          ))}
        </div>
      </section>

      <MarketingForm 
        open={showModal} onOpenChange={setShowModal} 
        type={activeType} isEdit={isEdit} 
        form={form} setForm={setForm} onSubmit={handleSave} 
      />
    </div>
  );
}