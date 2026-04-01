// src/components/user/user-sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Heart, Package, ChevronRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const MENU_ITEMS = [
  { icon: <User size={18} />, label: "Profil Pribadi", href: "/profile" },
  { icon: <Heart size={18} />, label: "Wishlist", href: "/wishlist" },
  { icon: <Package size={18} />, label: "Pesanan", href: "/orders" },
];

export function UserSidebar() {
  const pathname = usePathname();

  return (
    // min-w-[256px] menjaga lebar tetap 64 (16rem/256px) agar tidak goyang
    <aside className="w-full lg:w-64 lg:min-w-[256px] shrink-0 space-y-6">
      <div className="space-y-1">
        <h2 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
          Akun Saya
        </h2>
        <nav className="space-y-1.5">
          {MENU_ITEMS.map((item) => {
            // Perbaikan Logika Active: 
            // Cek apakah pathname sama persis ATAU dimulai dengan href (untuk sub-halaman)
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link key={item.href} href={item.href} className="block">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-between h-12 rounded-xl px-4 transition-all duration-200 group relative",
                    isActive 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:text-white" 
                      : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                  )}
                >
                  <div className="flex items-center gap-3 font-bold text-sm">
                    {/* Indikator Bar Putih di Kiri saat Aktif */}
                    {isActive && (
                      <span className="absolute left-0 w-1 h-5 bg-white rounded-r-full" />
                    )}
                    
                    <span className={cn(
                      "transition-transform duration-200",
                      isActive ? "scale-110" : "group-hover:scale-110"
                    )}>
                      {item.icon}
                    </span>
                    {item.label}
                  </div>

                  <ChevronRight 
                    size={14} 
                    className={cn(
                      "transition-all duration-300", 
                      isActive 
                        ? "opacity-100 translate-x-0" 
                        : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                    )} 
                  />
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>

      <Card className="hidden lg:block border-none bg-linear-to-br from-blue-600 to-indigo-700 text-white overflow-hidden shadow-xl shadow-blue-500/20 rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Truck size={20} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-wider">Layanan Express</p>
          </div>
          <p className="text-[11px] text-blue-50 opacity-90 leading-relaxed">
            Pesanan Anda diprioritaskan oleh tim logistik kami.
          </p>
        </CardContent>
      </Card>
    </aside>
  );
}