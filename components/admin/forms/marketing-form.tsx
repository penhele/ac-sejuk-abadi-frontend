"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Simpan Textarea dan Gambar jika BE berencana menambahkannya nanti, 
// tapi untuk sekarang kita fokus ke yang wajib di DTO.
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PromoItem, MarketingType } from "@/types/marketing";

interface MarketingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: MarketingType;
  isEdit: boolean;
  form: any;
  setForm: (data: any) => void;
  onSubmit: () => void;
}

export function MarketingForm({ open, onOpenChange, type, isEdit, form, setForm, onSubmit }: MarketingFormProps) {
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Update" : "Tambah"} {type === "diskon" ? "Promo Diskon" : "Flash News"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Sesuai DTO: id_product */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-slate-500">ID Produk</label>
            <Input 
              placeholder="Contoh: PROD-001" 
              value={form.id_product || ""} 
              onChange={(e) => setForm({ ...form, id_product: e.target.value })} 
            />
          </div>

          {type === "diskon" && (
            <>
              {/* Sesuai DTO: price (Harga setelah diskon) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-500">Harga Promo (Rp)</label>
                <Input 
                  type="number" 
                  placeholder="50000" 
                  value={form.price || ""} 
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} 
                />
              </div>

              {/* Sesuai DTO: start_date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-500">Tanggal Mulai</label>
                <Input 
                  type="date" 
                  value={form.start_date ? new Date(form.start_date).toISOString().split('T')[0] : ""} 
                  onChange={(e) => setForm({ ...form, start_date: e.target.value })} 
                />
              </div>

              {/* Sesuai DTO: end_date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-500">Tanggal Berakhir</label>
                <Input 
                  type="date" 
                  value={form.end_date ? new Date(form.end_date).toISOString().split('T')[0] : ""} 
                  onChange={(e) => setForm({ ...form, end_date: e.target.value })} 
                />
              </div>
            </>
          )}

          {/* Field tambahan (Opsional, pastikan BE mengizinkan field ini) */}
          {type !== "diskon" && (
             <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-500">Deskripsi</label>
                <Input 
                  placeholder="Info flash news..." 
                  value={form.description || ""} 
                  onChange={(e) => setForm({ ...form, description: e.target.value })} 
                />
             </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Batal</Button>
          <Button 
            onClick={onSubmit} 
            className={type === 'diskon' ? 'bg-blue-600' : 'bg-orange-600'}
          >
            {isEdit ? "Simpan Perubahan" : "Tambah Diskon"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}