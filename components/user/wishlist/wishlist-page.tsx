// src/app/wishlist/_components/wishlist-page-content.tsx
"use client";

import { useState } from "react";
import { Heart, ShieldCheck, ChevronRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";

// Import Shared Component
import { UserSidebar } from "@/components/user/user-sidebar";

// Sub-components (Pastikan file ini sudah dipisah sebelumnya)
import { WishlistItem } from "./wishlist-item";
import { WishlistEmpty } from "./wishlist-empty";

const INITIAL_DATA = [
  { 
    id: 1,
    name: 'AC Panasonic 1 PK', 
    desc: 'Inverter hemat energi dengan pemurni udara nanoe-G.', 
    price: 4500000, 
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=300&auto=format&fit=crop",
    tag: "Terlaris",
    rating: 4.8,
    stock: "Tersedia"
  },
  { 
    id: 2,
    name: 'AC Daikin 1.5 PK', 
    desc: 'Pendinginan super cepat dengan teknologi Thailand terbaru.', 
    price: 5200000, 
    image: "https://images.unsplash.com/photo-1591189863430-ab87e120f312?q=80&w=300&auto=format&fit=crop",
    tag: "Hemat Listrik",
    rating: 4.9,
    stock: "Stok Terbatas"
  }
];

export default function WishlistPageContent() {
  const [items, setItems] = useState(INITIAL_DATA);

  const removeItem = (id: number, name: string) => {
    setItems(items.filter(item => item.id !== id));
    toast.error(`${name} dihapus dari wishlist`);
  };

  const addToCart = (name: string) => {
    toast.success(`${name} masuk keranjang!`);
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl antialiased min-h-screen">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* SIDEBAR - Sekarang menggunakan Shared Component */}
        <UserSidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1">
          <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white dark:bg-slate-900 transition-all">
            {/* Dekorasi Atas */}
            <div className="h-1.5 bg-linear-to-r from-red-500 via-pink-500 to-rose-500 w-full" />
            
            <CardHeader className="p-8 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex flex-row items-center gap-3">
                <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-xl text-red-500">
                  <Heart size={18} className="fill-current" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                    Wishlist
                  </CardTitle>
                  <CardDescription className="text-base">
                    Simpan produk impian Anda untuk dibeli nanti.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                <AnimatePresence mode="popLayout">
                  {items.length === 0 ? (
                    <WishlistEmpty key="empty" />
                  ) : (
                    items.map((item) => (
                      <WishlistItem 
                        key={item.id} 
                        item={item} 
                        onRemove={removeItem} 
                        onAddToCart={addToCart} 
                      />
                    ))
                  )}
                </AnimatePresence>
              </div>
            </CardContent>

            <CardFooter className="bg-slate-50/50 dark:bg-slate-800/20 p-8 flex flex-col md:flex-row justify-between items-center gap-4">
               <div className="flex items-center gap-2 text-slate-400">
                  <ShieldCheck size={16} />
                  <p className="text-[11px] font-bold uppercase tracking-widest">
                    Transaksi Aman & Garansi Resmi
                  </p>
               </div>
               <Button variant="link" className="text-blue-600 font-bold group gap-2 h-auto p-0">
                  Lanjut Belanja 
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
               </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}