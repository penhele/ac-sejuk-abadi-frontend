"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { MarketingType } from "@/types/marketing";

interface MarketingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: MarketingType; 
  isEdit: boolean;
  form: any;
  setForm: (data: any) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export function MarketingForm({ 
  open, 
  onOpenChange, 
  isEdit, 
  form, 
  setForm, 
  onSubmit,
  isLoading = false 
}: MarketingFormProps) {

  const formatDateForInput = (isoString: string) => {
    if (!isoString) return "";
    try {
      return new Date(isoString).toISOString().split('T')[0];
    } catch (e) {
      return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            {isEdit ? "Update" : "Buat"} Promo Diskon
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-slate-500">ID Produk (UUID)</label>
            <Input 
              placeholder="Paste UUID Produk di sini..." 
              value={form.id_product || ""} 
              onChange={(e) => setForm({ ...form, id_product: e.target.value })} 
              className="rounded-xl border-slate-200 focus:ring-blue-500"
              disabled={isLoading}
            />
            <p className="text-[10px] text-slate-400 italic">*Ambil ID dari daftar produk di Admin Management</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-slate-500">Harga Promo (Rp)</label>
            <Input 
              type="number" 
              placeholder="Contoh: 5000000" 
              value={form.price || ""} 
              onChange={(e) => setForm({ ...form, price: e.target.value })} 
              className="rounded-xl border-slate-200"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-500">Tanggal Mulai</label>
              <Input 
                type="date" 
                value={formatDateForInput(form.start_date)} 
                onChange={(e) => setForm({ 
                  ...form, 
                  start_date: e.target.value ? new Date(e.target.value).toISOString() : "" 
                })} 
                className="rounded-xl border-slate-200"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-500">Tanggal Berakhir</label>
              <Input 
                type="date" 
                value={formatDateForInput(form.end_date)} 
                onChange={(e) => setForm({ 
                  ...form, 
                  end_date: e.target.value ? new Date(e.target.value).toISOString() : "" 
                })} 
                className="rounded-xl border-slate-200"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="rounded-xl text-slate-500"
          >
            Batal
          </Button>
          <Button 
            onClick={onSubmit} 
            disabled={isLoading}
            className="rounded-xl px-8 bg-blue-600 hover:bg-blue-700 shadow-md transition-all active:scale-95"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Menyimpan...
              </>
            ) : (
              isEdit ? "Simpan Perubahan" : "Aktifkan Diskon"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}