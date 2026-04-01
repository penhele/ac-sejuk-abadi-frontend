// components/user/profile/security-section.tsx
import { ShieldCheck } from "lucide-react";
import { PasswordField } from "./password-field"; // Pastikan path import benar

export function SecuritySection({ formData, showPass, setShowPass, handleInputChange }: any) {
  return (
    <section className="space-y-6 pt-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-red-500 rounded-full" />
        <h3 className="font-bold text-lg tracking-tight text-slate-800 dark:text-slate-100">
          Ubah Kata Sandi
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PasswordField 
          id="oldPassword" 
          label="Password Lama" 
          show={showPass.old} 
          onToggle={() => setShowPass({ ...showPass, old: !showPass.old })} 
          value={formData.oldPassword} 
          onChange={handleInputChange} // <-- HARUS ADA INI
        />
        
        <PasswordField 
          id="newPassword" 
          label="Password Baru" 
          show={showPass.new} 
          onToggle={() => setShowPass({ ...showPass, new: !showPass.new })} 
          value={formData.newPassword} 
          onChange={handleInputChange} // <-- HARUS ADA INI
          helper="Min. 8 Karakter"
        />
        
        <PasswordField 
          id="confirmPassword" 
          label="Konfirmasi Password" 
          show={showPass.confirm} 
          onToggle={() => setShowPass({ ...showPass, confirm: !showPass.confirm })} 
          value={formData.confirmPassword} 
          onChange={handleInputChange} // <-- HARUS ADA INI
        />
      </div>

      {/* Info Box */}
      <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 flex gap-4 mt-4">
        <div className="p-2 bg-blue-600 rounded-lg shrink-0 h-fit text-white">
          <ShieldCheck size={20} />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-blue-900">Tips Keamanan</p>
          <p className="text-xs text-blue-700/80 leading-relaxed">
            Gunakan kombinasi huruf besar, angka, dan simbol untuk password yang kuat.
          </p>
        </div>
      </div>
    </section>
  );
}