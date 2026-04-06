"use client";

import { X, ImageIcon, Calendar, MapPin, Tag, Box } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Portfolio } from "@/types/portofolio";

interface PortfolioFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: Partial<Portfolio>;
  setForm: (form: any) => void;
  onSubmit: (files: File[]) => void;
  isEdit: boolean;
  isLoading?: boolean;
}

export function PortfolioForm({ open, onOpenChange, form, setForm, onSubmit, isEdit, isLoading }: PortfolioFormProps) {
  
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    // Simpan file asli ke dalam array images di state form
    setForm({
      ...form,
      images: [...(form.images || []), ...newFiles],
    });
  };

  const removeImage = (imgIndex: number) => {
    setForm({
      ...form,
      images: form.images?.filter((_, i: number) => i !== imgIndex),
    });
  };

  const handleFinalSubmit = () => {
    // Ambil hanya objek File untuk dikirim ke API upload gambar
    const filesOnly = (form.images || []).filter((img: any) => img instanceof File) as File[];
    onSubmit(filesOnly);
  };
return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* 1. Tambahkan h-[90vh] atau h-full jika ingin memenuhi layar */}
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden rounded-2xl flex flex-col h-[85vh]">
        
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold">
            {isEdit ? "Perbarui Proyek" : "Tambah Proyek Portofolio"}
          </DialogTitle>
        </DialogHeader>

        {/* 2. Gunakan flex-1 agar ScrollArea mengambil sisa ruang yang ada */}
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-5 pb-6"> {/* Tambah padding bottom agar tidak mepet footer */}
            
            {/* --- INPUT FIELDS --- */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Box className="w-4 h-4 text-blue-500" /> ID Produk *
                </label>
                <Input 
                  value={form.id_product || ""} 
                  onChange={(e) => setForm({ ...form, id_product: e.target.value })} 
                  placeholder="PROD-001" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-500" /> Kategori
                </label>
                <Input 
                  value={form.category || ""} 
                  onChange={(e) => setForm({ ...form, category: e.target.value })} 
                  placeholder="Service / Install" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Nama Proyek *</label>
              <Input 
                value={form.name || ""} 
                onChange={(e) => setForm({ ...form, name: e.target.value })} 
                placeholder="Misal: Pemasangan AC Kantor BUMN" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500" /> Lokasi
                </label>
                <Input 
                  value={form.location || ""} 
                  onChange={(e) => setForm({ ...form, location: e.target.value })} 
                  placeholder="Jakarta" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" /> Tanggal
                </label>
                <Input 
                  type="date"
                  value={form.date ? new Date(form.date).toISOString().split('T')[0] : ""} 
                  onChange={(e) => setForm({ ...form, date: e.target.value })} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Detail Pekerjaan</label>
              <Textarea 
                value={form.description || ""} 
                onChange={(e) => setForm({ ...form, description: e.target.value })} 
                placeholder="Deskripsi pengerjaan..." 
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700">Foto Dokumentasi</label>
              <div className="grid grid-cols-4 gap-3">
                {form.images?.map((img: any, idx: number) => (
                  <div key={idx} className="relative aspect-square rounded-xl border overflow-hidden group">
                    <img 
                      src={img instanceof File ? URL.createObjectURL(img) : img} 
                      className="w-full h-full object-cover" 
                      alt="preview" 
                    />
                    <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <label className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 aspect-square transition-all border-slate-200">
                  <ImageIcon className="w-6 h-6 text-slate-400" />
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleImages} />
                </label>
              </div>
            </div>
            {/* --- END INPUT FIELDS --- */}

          </div>
        </ScrollArea>

        {/* Footer tetap di bawah karena flex-col pada DialogContent */}
        <div className="p-6 bg-slate-50 border-t flex justify-end gap-3 mt-auto">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Batal</Button>
          <Button 
            onClick={handleFinalSubmit} 
            disabled={isLoading || !form.name || !form.id_product}
            className="bg-blue-600 px-8"
          >
            {isLoading ? "Memproses..." : isEdit ? "Simpan Perubahan" : "Publikasikan"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}