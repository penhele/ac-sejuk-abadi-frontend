"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImagePlus, LayoutList, X } from "lucide-react";
import { Product } from "@/types/product";

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit: boolean;
  form: Product;
  setForm: React.Dispatch<React.SetStateAction<Product>>;
  onSubmit: () => void;
}

export function ProductForm({ open, onOpenChange, isEdit, form, setForm, onSubmit }: ProductFormProps) {
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm((prev) => ({
            ...prev,
            images: [...prev.images, reader.result as string],
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (indexToRemove: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl flex items-center gap-2">
            <LayoutList className="w-5 h-5 text-blue-600" />
            {isEdit ? "Edit Detail Produk" : "Tambah Produk Baru"}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[80vh] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* KOLOM KIRI: INFO DASAR */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Foto Unit</label>
                <div className="grid grid-cols-3 gap-2">
                  {form.images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border group">
                      <img src={img} className="w-full h-full object-cover" alt="preview" />
                      <button onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></button>
                    </div>
                  ))}
                  <label className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 cursor-pointer">
                    <ImagePlus className="w-6 h-6 text-slate-400" />
                    <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageUpload} />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Nama Produk</label>
                <Input placeholder="Nama lengkap produk..." value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Harga (Rp)</label>
                  <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Kategori</label>
                  <select className="w-full h-10 border rounded-md px-3 text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    <option value="AC">AC</option>
                    <option value="Sparepart">Sparepart</option>
                  </select>
                </div>
              </div>
            </div>

            {/* KOLOM KANAN: SPECS TEKNIS */}
            <div className="bg-slate-50 p-5 rounded-xl space-y-4 border">
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider border-b pb-2">Spesifikasi Teknis</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Brand</label>
                  <Input className="h-8 text-sm" value={form.specs.brand} onChange={(e) => setForm({...form, specs: {...form.specs, brand: e.target.value}})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Kapasitas PK</label>
                  <Input className="h-8 text-sm" value={form.specs.pk} onChange={(e) => setForm({...form, specs: {...form.specs, pk: e.target.value}})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Daya (Watt)</label>
                  <Input className="h-8 text-sm" value={form.specs.watt} onChange={(e) => setForm({...form, specs: {...form.specs, watt: e.target.value}})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">BTU/h</label>
                  <Input className="h-8 text-sm" value={form.specs.btu} onChange={(e) => setForm({...form, specs: {...form.specs, btu: e.target.value}})} />
                </div>
              </div>
              {/* Tambahkan field lainnya di sini sesuai kebutuhan */}
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="p-6 bg-slate-50 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
          <Button onClick={onSubmit} className="bg-blue-600 hover:bg-blue-700">Simpan Perubahan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}