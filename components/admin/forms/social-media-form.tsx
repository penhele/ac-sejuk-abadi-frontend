"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2, Loader2 } from "lucide-react";

interface SocialMediaFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  isLoading: boolean;
}

export function SocialMediaForm({ open, onOpenChange, onSubmit, initialData, isLoading }: SocialMediaFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    url: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        icon: initialData.icon || "",
        url: initialData.url || "",
      });
    } else {
      setFormData({ name: "", icon: "", url: "" });
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-pink-500" />
            {initialData ? "Edit Sosial Media" : "Tambah Sosial Media"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="social-name">Nama Platform</Label>
            <Input
              id="social-name"
              placeholder="Contoh: Instagram, TikTok"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="social-icon">Slug Icon</Label>
            <Input
              id="social-icon"
              placeholder="Contoh: instagram, twitter, facebook"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value.toLowerCase() })}
              required
            />
            <p className="text-[10px] text-muted-foreground">Digunakan sebagai referensi library icon di frontend.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="social-url">URL Link</Label>
            <Input
              id="social-url"
              type="url"
              placeholder="https://..."
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-pink-600 hover:bg-pink-700">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...
                </>
              ) : (
                "Simpan Link"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}