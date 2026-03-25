"use client";

import { useState } from "react";
// 🔥 IMPORT SHADCN COMPONENTS
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Megaphone, Tag } from "lucide-react";

export default function MarketingPage() {
  // ================= STATE DATA =================
  const [discounts, setDiscounts] = useState([
    {
      title: "Diskon Lebaran",
      percent: 20,
      description: "Promo spesial lebaran untuk semua layanan cuci AC.",
      image: "https://d2uaxkyha5agap.cloudfront.net/campaign_banner/FSDESAC/LP%20ac%20care%20complete%402x-1734404155.png",
    },
  ]);

  const [flashNews, setFlashNews] = useState([
    {
      title: "Promo hari ini!",
      description: "Diskon 20% untuk semua unit AC Gree baru.",
      image: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1526876744/AC_Gree_Flash_Sale_Shopee_qhn3uo.png",
    },
  ]);

  // ================= STATE UI =================
  const [type, setType] = useState<"diskon" | "news">("diskon");
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState<any>({});

  // ================= HANDLERS =================
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const openAdd = (t: "diskon" | "news") => {
    setType(t);
    setForm({});
    setIsEdit(false);
    setShowModal(true);
  };

  const openEdit = (t: "diskon" | "news", index: number) => {
    setType(t);
    setIsEdit(true);
    setEditIndex(index);
    setForm(t === "diskon" ? discounts[index] : flashNews[index]);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (type === "diskon") {
      if (!form.title || !form.percent) return;
      if (isEdit && editIndex !== null) {
        const updated = [...discounts];
        updated[editIndex] = form;
        setDiscounts(updated);
      } else {
        setDiscounts([...discounts, form]);
      }
    } else {
      if (!form.title || !form.description) return;
      if (isEdit && editIndex !== null) {
        const updated = [...flashNews];
        updated[editIndex] = form;
        setFlashNews(updated);
      } else {
        setFlashNews([...flashNews, form]);
      }
    }
    setShowModal(false);
  };

  const handleDelete = (t: "diskon" | "news", index: number) => {
    if (confirm(`Hapus ${t === 'diskon' ? 'promo' : 'berita'} ini?`)) {
      if (t === "diskon") setDiscounts(discounts.filter((_, i) => i !== index));
      else setFlashNews(flashNews.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="p-6 space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Pemasaran</h1>
        <p className="text-muted-foreground text-sm">Kelola promo diskon dan berita singkat untuk pelanggan.</p>
      </div>

      {/* ================= SECTION DISKON ================= */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <Tag className="w-5 h-5 text-blue-600" />
            <h2>Daftar Promo Diskon</h2>
          </div>
          <Button size="sm" onClick={() => openAdd("diskon")} className="gap-2">
            <Plus className="w-4 h-4" /> Tambah Diskon
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {discounts.map((item, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="relative h-40 bg-muted">
                {item.image && <img src={item.image} className="w-full h-full object-cover" alt={item.title} />}
                <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
                  {item.percent}% OFF
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg line-clamp-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2 h-10">{item.description}</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit("diskon", i)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete("diskon", i)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= SECTION FLASH NEWS ================= */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <Megaphone className="w-5 h-5 text-orange-600" />
            <h2>Flash News</h2>
          </div>
          <Button size="sm" variant="outline" onClick={() => openAdd("news")} className="gap-2">
            <Plus className="w-4 h-4" /> Tambah News
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {flashNews.map((item, i) => (
            <Card key={i} className="flex flex-row overflow-hidden h-32">
              <div className="w-1/3 h-full bg-muted">
                {item.image && <img src={item.image} className="w-full h-full object-cover" alt={item.title} />}
              </div>
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit("news", i)}>
                    <Pencil className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={() => handleDelete("news", i)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= MODAL DIALOG SHADCN ================= */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Perbarui" : "Tambah"} {type === "diskon" ? "Promo Diskon" : "Flash News"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Judul</label>
              <Input
                placeholder="Masukkan judul..."
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            {type === "diskon" && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Persentase Diskon (%)</label>
                <Input
                  type="number"
                  placeholder="Contoh: 20"
                  value={form.percent || ""}
                  onChange={(e) => setForm({ ...form, percent: e.target.value })}
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Deskripsi</label>
              <Textarea
                placeholder="Detail informasi..."
                value={form.description || ""}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="h-24"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Media/Gambar</label>
              <Input type="file" accept="image/*" onChange={handleImage} />
              {form.image && (
                <div className="mt-2 rounded-md overflow-hidden border">
                  <img src={form.image} className="w-full h-32 object-cover" alt="Preview" />
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
            <Button onClick={handleSubmit}>Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}