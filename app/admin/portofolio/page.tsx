"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Pencil, Trash2, Briefcase, ImageIcon, X } from "lucide-react";

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState([
    {
      title: "Instalasi AC Kantor",
      description: "Pemasangan AC di gedung perkantoran pusat",
      images: ["https://ahliac.com/wp-content/uploads/2023/05/AC-Split-Duct-Murah.jpg"],
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    images: [] as string[], // Ubah ke Array
  });

  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  // 🔹 HANDLE MULTI IMAGE UPLOAD
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    
    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          images: [...prev.images, reader.result as string],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  // HAPUS SATU FOTO DARI FORM
  const removeImage = (imgIndex: number) => {
    setForm({
      ...form,
      images: form.images.filter((_, i) => i !== imgIndex),
    });
  };

  const handleAdd = () => {
    setForm({ title: "", description: "", images: [] });
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEdit = (index: number) => {
    setForm(portfolios[index]);
    setEditIndex(index);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!form.title || !form.description) return;
    if (isEdit && editIndex !== null) {
      const updated = [...portfolios];
      updated[editIndex] = form;
      setPortfolios(updated);
    } else {
      setPortfolios([...portfolios, form]);
    }
    setShowModal(false);
  };

  const handleDelete = (index: number) => {
    if (confirm("Hapus portofolio ini?")) {
      setPortfolios(portfolios.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portofolio Pekerjaan</h1>
          <p className="text-muted-foreground">Dokumentasi multi-foto hasil kerja tim.</p>
        </div>
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" /> Tambah Portofolio
        </Button>
      </div>

      {/* GRID LIST PORTOFOLIO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((item, i) => (
          <Card key={i} className="overflow-hidden border-2 hover:shadow-lg transition-all group">
            <CardContent className="p-0">
              {/* DISPLAY FOTO UTAMA & COUNTER */}
              <div className="relative h-48 bg-slate-100">
                {item.images.length > 0 ? (
                  <>
                    <img src={item.images[0]} alt="cover" className="w-full h-full object-cover" />
                    {item.images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
                        +{item.images.length - 1} Foto Lainnya
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center"><Briefcase className="opacity-20" /></div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg truncate">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2 h-10">{item.description}</p>
                
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(i)}>
                    <Pencil className="w-3 h-3 mr-2" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" className="px-3" onClick={() => handleDelete(i)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* MODAL FORM MULTI-FOTO */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-150 p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>{isEdit ? "Edit Portofolio" : "Tambah Portofolio"}</DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[80vh] p-6 pt-4">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Nama Proyek</label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Contoh: Instalasi AC Split Duct Mall" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Detail Pekerjaan</label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="min-h-25" placeholder="Deskripsikan pekerjaan..." />
              </div>

              {/* UPLOAD MULTI FOTO */}
              <div className="space-y-3">
                <label className="text-sm font-semibold flex justify-between">
                  Foto Dokumentasi 
                  <span className="text-xs font-normal text-blue-600">{form.images.length} Foto terpilih</span>
                </label>
                
                <div className="grid grid-cols-3 gap-3">
                  {/* Preview Foto-foto yang sudah diupload */}
                  {form.images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg border overflow-hidden group">
                      <img src={img} className="w-full h-full object-cover" />
                      <button 
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {/* Tombol Input File (Bisa pilih banyak) */}
                  <label className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 aspect-square transition-colors">
                    <ImageIcon className="w-6 h-6 text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-500 mt-1 uppercase">Tambah</span>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImages} />
                  </label>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="p-6 bg-slate-50 border-t flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowModal(false)}>Batal</Button>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 px-8" disabled={!form.title || form.images.length === 0}>
              Simpan Perubahan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}