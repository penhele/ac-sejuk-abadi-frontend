import { User, Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function CustomerInfo({ customer }: { customer: any }) {
  return (
    <Card className="border-none shadow-sm dark:bg-slate-900 overflow-hidden">
      <div className="h-2 bg-blue-600 w-full" />
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <User size={18} className="text-blue-500" /> Informasi Pelanggan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold">
            {customer.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-bold leading-none">{customer.name}</p>
            <p className="text-xs text-muted-foreground mt-1">ID: {customer.id}</p>
          </div>
        </div>
        <Separator />
        <div className="space-y-3">
          <div className="flex gap-3"><Mail size={16} className="text-slate-400" /><p className="text-sm">{customer.email}</p></div>
          <div className="flex gap-3"><Phone size={16} className="text-slate-400" /><p className="text-sm">{customer.phone}</p></div>
          <div className="flex gap-3">
            <MapPin size={16} className="text-slate-400 shrink-0" />
            <div className="text-sm leading-relaxed">
              <strong>Alamat:</strong><br />{customer.address}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}