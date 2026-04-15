"use client";

import { User, Mail, Phone, MapPin, Copy, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CustomerInfoProps {
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

export function CustomerInfo({ customer }: CustomerInfoProps) {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} berhasil disalin`);
  };

  return (
    <Card className="border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden transition-all hover:shadow-md">
      <div className="h-1.5 bg-blue-600 w-full" />
      
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <User size={18} className="text-blue-500" /> 
            Profil Pelanggan
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <ExternalLink size={14} className="text-slate-400" />
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 flex items-center justify-center text-blue-700 dark:text-blue-400 font-black text-lg border border-blue-200/50 dark:border-blue-800/50 shadow-sm">
            {customer.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold leading-none text-slate-900 dark:text-white truncate">
              {customer.name}
            </p>
            <p className="text-[10px] font-mono text-muted-foreground mt-1.5 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded inline-block">
              ID: {customer.id}
            </p>
          </div>
        </div>

        <Separator className="opacity-50" />

        <div className="space-y-4">
          <div className="group flex items-start gap-3">
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
              <Mail size={14} className="text-slate-400 group-hover:text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Email</p>
              <p className="text-sm font-medium truncate">{customer.email}</p>
            </div>
          </div>

          <div className="group flex items-start gap-3">
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
              <Phone size={14} className="text-slate-400 group-hover:text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Telepon</p>
              <p className="text-sm font-medium">{customer.phone}</p>
            </div>
          </div>

          <div className="group flex items-start gap-3">
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
              <MapPin size={14} className="text-slate-400 group-hover:text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Alamat Pengiriman</p>
                <button 
                  onClick={() => copyToClipboard(customer.address, "Alamat")}
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Copy size={12} />
                </button>
              </div>
              <p className="text-xs leading-relaxed font-medium text-slate-600 dark:text-slate-300 italic">
                "{customer.address}"
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}