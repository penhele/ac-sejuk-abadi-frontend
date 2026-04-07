"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea"; // Opsional: untuk deskripsi yang lebih panjang
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  ImageIcon, 
  Tag, 
  Hash, 
  X, 
  Package, 
  BadgeDollarSign, 
  Layers, 
  FileText 
} from "lucide-react";

// 1. Update Interface sesuai DTO Backend Produk
export interface Product {
  id?: number;
  id_brand: number;
  name: string;
  description: string;
  type: string;
  price: number;
  quantity: number;
  pk: string;
  category_ids: number[];
  image?: string; // Untuk preview visual
}

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit: boolean;
  form: Partial<Product>;
  setForm: (form: any) => void;
  onSubmit: (file: File | null) => void;
  isLoading?: boolean;
}

export function ProductForm({
  open,
  onOpenChange,
  isEdit,
  form,
  setForm,
  onSubmit,
  isLoading,
}: ProductFormProps) {
  
  const [localPreview, setLocalPreview] = React.useState<string | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setLocalPreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setLocalPreview(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden rounded-2xl flex flex-col h-[90vh]">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold">
            {isEdit ? "Edit Produk" : "Tambah Produk Baru"}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-5 pb-6">
            
            {/* Row 1: ID Brand & PK */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-blue-500" /> ID Brand *
                </label>
                <Input
                  type="number"
                  placeholder="1"
                  value={form.id_brand || ""}
                  onChange={(e) => setForm({ ...form, id_brand: parseInt(e.target.value) })}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-500" /> Kode PK *
                </label>
                <Input
                  placeholder="Contoh: SGS24"
                  value={form.pk || ""}
                  onChange={(e) => setForm({ ...form, pk: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Nama Produk *</label>
              <Input
                placeholder="AC Daikin Inverter 1 PK"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" /> Deskripsi
              </label>
              <Input
                placeholder="AC terbaru dengan fitur canggih..."
                value={form.description || ""}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="rounded-xl"
              />
            </div>

            {/* Row 2: Type & Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-500" /> Tipe
                </label>
                <Input
                  placeholder="AC"
                  value={form.type || ""}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <BadgeDollarSign className="w-4 h-4 text-green-600" /> Harga *
                </label>
                <Input
                  type="number"
                  placeholder="15000000"
                  value={form.price || ""}
                  onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) })}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Row 3: Quantity & Category IDs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-500" /> Stok *
                </label>
                <Input
                  type="number"
                  placeholder="50"
                  value={form.quantity || ""}
                  onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) })}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-blue-500" /> Category IDs (CSV)
                </label>
                <Input
                  placeholder="1, 2"
                  value={form.category_ids?.join(", ") || ""}
                  onChange={(e) => {
                    const ids = e.target.value.split(",").map(id => parseInt(id.trim())).filter(id => !isNaN(id));
                    setForm({ ...form, category_ids: ids });
                  }}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Foto Produk</label>
              <div className="relative group">
                <label className={`
                  flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed transition-all cursor-pointer
                  ${localPreview || form.image ? 'border-transparent' : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50'}
                `}>
                  {localPreview || form.image ? (
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <img 
                        src={localPreview || form.image} 
                        className="w-full h-full object-contain bg-slate-100" 
                        alt="Preview" 
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-xs font-bold">Ganti Gambar</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
                      <span className="text-xs font-medium text-slate-500 text-center px-4">
                        Klik untuk unggah foto produk
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />
                </label>
                {(localPreview || form.image) && (
                  <button 
                    type="button"
                    onClick={clearImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="p-6 bg-slate-50 border-t flex justify-end gap-3 mt-auto">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl">
            Batal
          </Button>
          <Button 
            onClick={() => onSubmit(selectedFile)} 
            disabled={isLoading || !form.name || !form.id_brand || !form.price || !form.pk}
            className="bg-blue-600 hover:bg-blue-700 px-8 rounded-xl font-bold shadow-lg shadow-blue-100"
          >
            {isLoading ? "Memproses..." : isEdit ? "Simpan Perubahan" : "Simpan Produk"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}