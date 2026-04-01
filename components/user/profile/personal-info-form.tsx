// app/profile/_components/personal-info-form.tsx
import { User, Mail, Phone, MapPin, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PersonalInfoForm({ formData, handleInputChange }: any) {
  return (
    <div className="space-y-6">
      {/* SEKSI 1: NAMA & KONTAK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="first_name">Nama Depan</Label>
          <Input 
            id="first_name" 
            name="first_name" // Pastikan ada properti name untuk handler input
            value={formData.first_name} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="last_name">Nama Belakang</Label>
          <Input 
            id="last_name" 
            name="last_name"
            value={formData.last_name} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Nomor Telepon</Label>
          <Input 
            id="phone" 
            name="phone"
            value={formData.phone} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email (Read Only)</Label>
          <Input 
            id="email" 
            name="email"
            value={formData.email} 
            readOnly 
            className="bg-slate-50 cursor-not-allowed italic text-muted-foreground"
          />
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* SEKSI 2: ALAMAT LENGKAP */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="address">Alamat Lengkap</Label>
          <Input 
            id="address" 
            name="address"
            placeholder="Contoh: Jl. Srengseng Sawah No.2"
            value={formData.address} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rt">RT</Label>
            <Input 
              id="rt" 
              name="rt"
              value={formData.rt} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rw">RW</Label>
            <Input 
              id="rw" 
              name="rw"
              value={formData.rw} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="col-span-2 md:col-span-2 space-y-2">
            <Label htmlFor="zip_code">Kode Pos</Label>
            <Input 
              id="zip_code" 
              name="zip_code"
              value={formData.zip_code} 
              onChange={handleInputChange} 
            />
          </div>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* SEKSI 3: KEAMANAN (Password) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="password">Password Baru</Label>
          <Input 
            id="password" 
            name="password"
            type="password" 
            placeholder="••••••••"
            onChange={handleInputChange} 
          />
          <p className="text-[10px] text-muted-foreground italic">*Kosongkan jika tidak ingin mengubah password</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
          <Input 
            id="password_confirmation" 
            name="password_confirmation"
            type="password" 
            placeholder="••••••••"
            onChange={handleInputChange} 
          />
        </div>
      </div>
    </div>
  );
}