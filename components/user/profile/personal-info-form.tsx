// app/profile/_components/personal-info-form.tsx
import { User, Mail, Phone, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export function PersonalInfoForm({ formData, handleInputChange }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label htmlFor="name">Nama Lengkap</label>
        <Input 
          id="name" 
          value={formData.name} 
          onChange={handleInputChange} // TAMBAHKAN INI
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone">Nomor Telepon</label>
        <Input 
          id="phone" 
          value={formData.phone} 
          onChange={handleInputChange} // TAMBAHKAN INI
        />
      </div>
      
      {/* Email biasanya readOnly, jadi tambahkan properti readOnly agar warning hilang */}
      <div className="space-y-2">
        <label htmlFor="email">Email</label>
        <Input 
          id="email" 
          value={formData.email} 
          readOnly // TAMBAHKAN INI jika tidak boleh diubah
        />
      </div>
    </div>
  );
}