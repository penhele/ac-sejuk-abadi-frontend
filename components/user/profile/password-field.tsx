import { Lock, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordFieldProps {
  id: string;
  label: string;
  show: boolean;
  onToggle: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helper?: string;
}

export function PasswordField({ id, label, show, onToggle, value, onChange, helper }: PasswordFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor={id} className="text-[11px] font-black uppercase tracking-widest text-slate-400">{label}</Label>
        {helper && <span className="text-[10px] text-blue-600 font-bold">{helper}</span>}
      </div>
      <div className="group relative">
        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
        <Input 
          id={id} 
          type={show ? "text" : "password"} 
          value={value}
          onChange={onChange}
          placeholder="••••••••" 
          className="pl-10 pr-10 h-11 rounded-xl border-slate-200 focus:ring-4 focus:ring-blue-500/10 transition-all" 
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-3 text-slate-400 hover:text-blue-600 transition-colors"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}