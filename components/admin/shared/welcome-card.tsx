import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function WelcomeCard() {
  return (
    <Card className="border-none bg-blue-600 text-white shadow-lg overflow-hidden relative h-full">
      <CardContent className="p-8 relative z-10 flex flex-col h-full justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Selamat Datang 👋</h2>
          <p className="text-blue-100 text-sm leading-relaxed mb-6">
            Sistem manajemen Anda siap digunakan. Anda memiliki 100 pesanan baru yang belum diproses hari ini.
          </p>
        </div>

        <div className="space-y-3 mt-auto">
          <Button 
            variant="secondary" 
            className="w-full justify-between font-semibold group bg-white text-blue-600 hover:bg-blue-50"
          >
            Lihat Pesanan Baru
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full bg-transparent border-blue-400 hover:bg-blue-500 text-white hover:text-white"
          >
            Kelola Produk
          </Button>
        </div>
      </CardContent>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500 rounded-full opacity-50"></div>
      <div className="absolute -top-10 -left-10 w-24 h-24 bg-blue-400 rounded-full opacity-20"></div>
    </Card>
  );
}