"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PromoItem, MarketingType } from "@/types/marketing";

interface MarketingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: MarketingType;
  isEdit: boolean;
  form: Partial<PromoItem>;
  setForm: (data: any) => void;
  onSubmit: () => void;
}

export function MarketingForm({ open, onOpenChange, type, isEdit, form, setForm, onSubmit }: MarketingFormProps) {
  
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Update" : "Tambah"} {type === "diskon" ? "Promo Diskon" : "Flash News"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-slate-500">Judul Konten</label>
            <Input placeholder="Masukkan judul..." value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>

          {type === "diskon" && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-500">Persentase (%)</label>
              <Input type="number" placeholder="20" value={form.percent || ""} onChange={(e) => setForm({ ...form, percent: Number(e.target.value) })} />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-slate-500">Deskripsi</label>
            <Textarea className="h-24" placeholder="Detail informasi..." value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-slate-500">Gambar Banner</label>
            <Input type="file" accept="image/*" onChange={handleImage} />
            {form.image && (
              <div className="mt-2 rounded-lg overflow-hidden border h-32">
                <img src={form.image} className="w-full h-full object-cover" alt="Preview" />
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Batal</Button>
          <Button onClick={onSubmit} className={type === 'diskon' ? 'bg-blue-600' : 'bg-orange-600'}>
            Simpan Konten
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}