"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Star } from "lucide-react";

interface FeaturedFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  products: any[];
  isLoading: boolean;
}

export function FeaturedForm({ open, onOpenChange, onSubmit, initialData, products, isLoading }: FeaturedFormProps) {
  // --- STATE FORM ---
  const [formData, setFormData] = useState({
    id_product: "",
    priority: 1,
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id_product: initialData.id_product || "",
        priority: initialData.priority || 1,
        start_date: initialData.start_date ? new Date(initialData.start_date).toISOString().split("T")[0] : "",
        end_date: initialData.end_date ? new Date(initialData.end_date).toISOString().split("T")[0] : "",
      });
    } else {
      setFormData({ id_product: "", priority: 1, start_date: "", end_date: "" });
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      priority: Number(formData.priority),
      start_date: new Date(formData.start_date).toISOString(),
      end_date: new Date(formData.end_date).toISOString(),
    };
    onSubmit(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            {initialData ? "Edit Produk Unggulan" : "Tambah Produk Unggulan"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Pilih Produk</Label>
            <Select 
              value={formData.id_product} 
              onValueChange={(val) => setFormData({ ...formData, id_product: val })}
              disabled={!!initialData} 
            >
              <SelectTrigger>
                <SelectValue placeholder="Cari produk..." />
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name} ({p.pk} PK)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Prioritas Tampilan</Label>
            <Input
              id="priority"
              type="number"
              min="1"
              placeholder="Contoh: 1"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
              required
            />
            <p className="text-[10px] text-muted-foreground italic">*Semakin kecil angka, semakin utama tampilannya.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Tanggal Mulai</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_date">Tanggal Selesai</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                required
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-yellow-600 hover:bg-yellow-700">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...
                </>
              ) : (
                "Simpan Featured"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}