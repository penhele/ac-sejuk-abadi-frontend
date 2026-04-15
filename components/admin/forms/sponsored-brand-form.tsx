"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Megaphone } from "lucide-react";

interface SponsoredBrandFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  brands: any[];
  isLoading: boolean;
}

export function SponsoredBrandForm({ open, onOpenChange, onSubmit, initialData, brands, isLoading }: SponsoredBrandFormProps) {
  const [formData, setFormData] = useState({
    id_brand: "",
    priority: 1,
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id_brand: initialData.id_brand?.toString() || "",
        priority: initialData.priority || 1,
        start_date: initialData.start_date ? new Date(initialData.start_date).toISOString().split("T")[0] : "",
        end_date: initialData.end_date ? new Date(initialData.end_date).toISOString().split("T")[0] : "",
      });
    } else {
      setFormData({ id_brand: "", priority: 1, start_date: "", end_date: "" });
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id_brand: Number(formData.id_brand),
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
            <Megaphone className="w-5 h-5 text-orange-500" />
            {initialData ? "Edit Sponsored Brand" : "Tambah Sponsored Brand"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Pilih Brand</Label>
            <Select 
              value={formData.id_brand} 
              onValueChange={(val) => setFormData({ ...formData, id_brand: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih brand untuk promosi" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((b) => (
                  <SelectItem key={b.id} value={b.id.toString()}>
                    {b.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="spon-priority">Prioritas</Label>
            <Input
              id="spon-priority"
              type="number"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Mulai</Label>
              <Input
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Berakhir</Label>
              <Input
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                required
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Batal</Button>
            <Button type="submit" disabled={isLoading} className="bg-orange-600 hover:bg-orange-700">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Simpan Promosi"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}