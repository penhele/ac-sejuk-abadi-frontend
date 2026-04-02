"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ImagePlus, LayoutList, X, Zap, Maximize, ShieldCheck } from "lucide-react";
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

  const updateSpec = (key: keyof typeof form.specs, value: string) => {
    setForm({
      ...form,
      specs: { ...form.specs, [key]: value }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* PENTING: overflow-hidden pada DialogContent dan h-[90vh] */}
      <DialogContent className="sm:max-w-5xl p-0 overflow-hidden flex flex-col h-[90vh] max-h-[90vh]">
        
        {/* HEADER: Tetap di atas */}
        <DialogHeader className="p-6 border-b bg-white shrink-0">
          <DialogTitle className="text-xl flex items-center gap-2">
            <LayoutList className="w-5 h-5 text-blue-600" />
            {isEdit ? "Edit Detail Produk" : "Tambah Produk Baru"}
          </DialogTitle>
        </DialogHeader>
        
        {/* BODY: Menggunakan native scroll (paling aman) */}
        <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6">
              
              {/* KOLOM KIRI: INFO UTAMA & GAMBAR */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">Foto Unit</label>
                  <div className="grid grid-cols-3 gap-3">
                    {form.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border-2 group">
                        <img src={img} className="w-full h-full object-cover" alt="preview" />
                        <button 
                          type="button"
                          onClick={() => removeImage(idx)} 
                          className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <label className="aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center bg-slate-50 hover:bg-blue-50 hover:border-blue-300 transition-all cursor-pointer group">
                      <ImagePlus className="w-8 h-8 text-slate-400 group-hover:text-blue-500" />
                      <span className="text-[10px] mt-1 text-slate-500 font-medium">Tambah Foto</span>
                      <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageUpload} />
                    </label>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Nama Produk</label>
                    <Input 
                      placeholder="Contoh: AC Daikin Inverter Smile..." 
                      value={form.name} 
                      onChange={(e) => setForm({ ...form, name: e.target.value })} 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Harga (Rp)</label>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        value={form.price} 
                        onChange={(e) => setForm({ ...form, price: e.target.value })} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Kategori</label>
                      <select 
                        className="w-full h-10 border rounded-md px-3 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
                        value={form.category} 
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                      >
                        <option value="AC">AC</option>
                        <option value="Sparepart">Sparepart</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* KOLOM KANAN: SPECS TEKNIS */}
              <div className="bg-slate-50 p-6 rounded-2xl space-y-8 border shadow-sm h-fit">
                {/* Section 1: Identitas */}
                <section>
                  <div className="flex items-center gap-2 mb-4 text-blue-700">
                    <LayoutList className="w-4 h-4" />
                    <h3 className="text-xs font-bold uppercase tracking-widest">Informasi Produk</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <SpecInput label="Brand" value={form.specs.brand} onChange={(v) => updateSpec('brand', v)} />
                    <SpecInput label="Type" value={form.specs.type} onChange={(v) => updateSpec('type', v)} />
                    <SpecInput label="Series" value={form.specs.series} onChange={(v) => updateSpec('series', v)} />
                    <SpecInput label="Produksi" placeholder="Thailand / Indonesia" value={form.specs.produksi} onChange={(v) => updateSpec('produksi', v)} />
                  </div>
                </section>

                {/* Section 2: Performa */}
                <section>
                  <div className="flex items-center gap-2 mb-4 text-orange-600">
                    <Zap className="w-4 h-4" />
                    <h3 className="text-xs font-bold uppercase tracking-widest">Kelistrikan & BTU</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <SpecInput label="Kapasitas (PK)" value={form.specs.pk} onChange={(v) => updateSpec('pk', v)} />
                    <SpecInput label="Daya (Watt)" value={form.specs.watt} onChange={(v) => updateSpec('watt', v)} />
                    <SpecInput label="BTU/h" value={form.specs.btu} onChange={(v) => updateSpec('btu', v)} />
                    <SpecInput label="Bintang Label" placeholder="1-5" value={form.specs.label} onChange={(v) => updateSpec('label', v)} />
                  </div>
                </section>

                {/* Section 3: Teknis */}
                <section>
                  <div className="flex items-center gap-2 mb-4 text-emerald-600">
                    <ShieldCheck className="w-4 h-4" />
                    <h3 className="text-xs font-bold uppercase tracking-widest">Teknis & Garansi</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <SpecInput label="Refrigerant" value={form.specs.refrigerant} onChange={(v) => updateSpec('refrigerant', v)} />
                    <SpecInput label="Garansi" value={form.specs.warranty} onChange={(v) => updateSpec('warranty', v)} />
                    <div className="col-span-2">
                      <SpecInput label="Ukuran Pipa" placeholder="Contoh: 1/4 + 3/8" value={form.specs.ukuranpipa} onChange={(v) => updateSpec('ukuranpipa', v)} />
                    </div>
                  </div>
                </section>

                {/* Section 4: Fisik */}
                <section>
                  <div className="flex items-center gap-2 mb-4 text-purple-600">
                    <Maximize className="w-4 h-4" />
                    <h3 className="text-xs font-bold uppercase tracking-widest">Dimensi & Berat</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <SpecInput label="Dimensi Indoor" placeholder="P x L x T" value={form.specs.dimensiindoor} onChange={(v) => updateSpec('dimensiindoor', v)} />
                    <SpecInput label="Dimensi Outdoor" placeholder="P x L x T" value={form.specs.dimensioutdoor} onChange={(v) => updateSpec('dimensioutdoor', v)} />
                    <SpecInput label="Berat Indoor" placeholder="kg" value={form.specs.beratindoor} onChange={(v) => updateSpec('beratindoor', v)} />
                    <SpecInput label="Berat Outdoor" placeholder="kg" value={form.specs.beratoutdoor} onChange={(v) => updateSpec('beratoutdoor', v)} />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER: Tetap di bawah */}
        <DialogFooter className="p-6 bg-white border-t shrink-0 flex gap-3">
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Batal</Button>
          <Button type="button" onClick={onSubmit} className="bg-blue-600 hover:bg-blue-700 px-10 shadow-md text-white">
            Simpan Perubahan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SpecInput({ label, value, onChange, placeholder = "" }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">{label}</label>
      <Input 
        className="h-9 text-sm bg-white border-slate-200 focus:border-blue-400 transition-colors shadow-sm" 
        placeholder={placeholder}
        value={value || ""} 
        onChange={(e) => onChange(e.target.value)} 
      />
    </div>
  );
}