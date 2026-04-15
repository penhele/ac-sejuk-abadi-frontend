"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { 
  Tag, 
  Hash, 
  Package, 
  BadgeDollarSign, 
  Layers, 
  FileText 
} from "lucide-react";

export interface Product {
  id?: string; 
  id_brand: number;
  name: string;
  description: string;
  type: string;
  price: string; 
  quantity: number;
  pk: string;
  category_ids: number[];
}

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit: boolean;
  form: Partial<Product>;
  setForm: (form: any) => void;
  onSubmit: () => void;
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
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden rounded-2xl flex flex-col max-h-[90vh]">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold text-slate-900">
            {isEdit ? "✨ Edit Produk" : "🚀 Tambah Produk Baru"}
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-sm">
            Gunakan ID Brand dan Kategori yang tersedia di sistem.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-5 pb-6">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-blue-500" /> ID Brand *
                </label>
                <Input
                  type="number"
                  placeholder="1"
                  value={form.id_brand ?? ""}
                  onChange={(e) => setForm({ ...form, id_brand: parseInt(e.target.value) || 0 })}
                  className="rounded-xl border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-500" /> Kode PK (pk) *
                </label>
                <Input
                  placeholder="Contoh: SGS24"
                  value={form.pk || ""}
                  onChange={(e) => setForm({ ...form, pk: e.target.value })}
                  className="rounded-xl border-slate-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-500" /> Nama Produk (name) *
              </label>
              <Input
                placeholder="Samsung Galaxy S24"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl border-slate-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" /> Deskripsi (description)
              </label>
              <Input
                placeholder="Smartphone flagship terbaru"
                value={form.description || ""}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="rounded-xl border-slate-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-500" /> Tipe (type) *
                </label>
                <Input
                  placeholder="smartphone"
                  value={form.type || ""}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="rounded-xl border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <BadgeDollarSign className="w-4 h-4 text-green-600" /> Harga (price) *
                </label>
                <Input
                  type="text" 
                  placeholder="15000000"
                  value={form.price || ""}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="rounded-xl border-slate-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-500" /> Jumlah (quantity) *
                </label>
                <Input
                  type="number"
                  placeholder="50"
                  value={form.quantity ?? ""}
                  onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) || 0 })}
                  className="rounded-xl border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-blue-500" /> Kategori IDs (category_ids)
                </label>
                <Input
                  placeholder="1, 2"
                  value={Array.isArray(form.category_ids) ? form.category_ids.join(", ") : ""}
                  onChange={(e) => {
                    const ids = e.target.value.split(",")
                                   .map(id => parseInt(id.trim()))
                                   .filter(id => !isNaN(id));
                    setForm({ ...form, category_ids: ids });
                  }}
                  className="rounded-xl border-slate-200"
                />
              </div>
            </div>

          </div>
        </ScrollArea>

        <div className="p-6 bg-slate-50 border-t flex justify-end gap-3 mt-auto">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl">
            Batal
          </Button>
          <Button 
            onClick={() => onSubmit()} 
            disabled={isLoading || !form.name || !form.pk || !form.price}
            className="bg-blue-600 hover:bg-blue-700 px-8 rounded-xl font-bold text-white shadow-lg"
          >
            {isLoading ? "🔄 Memproses..." : isEdit ? "💾 Update Produk" : "✅ Tambah Produk"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}