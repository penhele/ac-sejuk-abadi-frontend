"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImagePlus, MapPin, Mail, Phone, Globe, Save, Loader2 } from "lucide-react";

interface CompanyFormProps {
  initialData: any;
  onSubmit: (data: any) => void;
  onLogoUpload: (file: File) => void;
  isLoading: boolean;
}

export function CompanyForm({ initialData, onSubmit, onLogoUpload, isLoading }: CompanyFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    email: "",
    phone: "",
    location: "",
    location_url: ""
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onLogoUpload(e.target.files[0]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-2 rounded-2xl border-none shadow-md">
        <CardHeader>
          <CardTitle>Detail Perusahaan</CardTitle>
          <CardDescription>Informasi ini akan muncul di halaman "Tentang Kami" dan Footer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nama Perusahaan</Label>
            <Input id="name" value={formData.name} onChange={handleChange} placeholder="Contoh: ACSA Company" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea id="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Jelaskan visi misi perusahaan..." />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email Kontak</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input id="email" className="pl-10" value={formData.email} onChange={handleChange} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input id="phone" className="pl-10" value={formData.phone} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Alamat Fisik</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input id="location" className="pl-10" value={formData.location} onChange={handleChange} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location_url">Google Maps URL</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input id="location_url" className="pl-10" value={formData.location_url} onChange={handleChange} placeholder="https://maps.google.com/..." />
            </div>
          </div>
          <Button className="w-full bg-indigo-600 rounded-xl mt-4" onClick={() => onSubmit(formData)} disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin mr-2 w-4 h-4" /> : <Save className="mr-2 w-4 h-4" />}
            Simpan Perubahan
          </Button>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-none shadow-md">
        <CardHeader>
          <CardTitle>Logo Perusahaan</CardTitle>
          <CardDescription>Gunakan file PNG atau JPG (Max 2MB).</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="w-40 h-40 rounded-2xl bg-slate-100 border-2 border-dashed flex items-center justify-center overflow-hidden relative group">
            {initialData?.logo ? (
              <img src={initialData.logo} alt="Logo" className="w-full h-full object-contain p-4" />
            ) : (
              <ImagePlus className="w-10 h-10 text-slate-300" />
            )}
            <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-xs font-bold">
              Ganti Logo
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          </div>
          <p className="text-[10px] text-slate-400 text-center italic">Klik pada gambar untuk mengunggah logo baru.</p>
        </CardContent>
      </Card>
    </div>
  );
}