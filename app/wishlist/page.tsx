"use client";

import { useState } from "react";
import { 
  Heart, ShoppingCart, Trash2, ArrowRight, 
  User, ShieldCheck, Star, PackageSearch, 
  ChevronRight, ShoppingBag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner"; // Atau ganti dengan toast library Anda

import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function WishlistPage() {
  const [items, setItems] = useState([
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
  ]);

  const removeItem = (id: number, name: string) => {
    setItems(items.filter(item => item.id !== id));
    toast.error(`${name} dihapus dari wishlist`);
  };

  const addToCart = (name: string) => {
    toast.success(`${name} berhasil masuk keranjang!`);
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl antialiased">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* --- SIDEBAR NAV (Point 4: Lebih Hidup) --- */}
        <aside className="w-full lg:w-72 space-y-6">
          <div className="space-y-1">
            <h2 className="px-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
              Dashboard Akun
            </h2>
            <nav className="flex flex-col gap-1">
              <SidebarItem icon={<User size={18} />} label="Profil Pribadi" />
              <SidebarItem icon={<Heart size={18} />} label="Wishlist" active count={items.length} />
            </nav>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-1">
          <Card className="border-none shadow-2xl shadow-blue-500/10 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
            {/* Dekorasi Atas */}
            <div className="h-1.5 bg-linear-to-r from-red-500 via-pink-500 to-rose-500 w-full" /> 
            
            <CardHeader className="p-8 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-xl">
                      <Heart size={18} />
                    </div>
                    <CardTitle className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                      Wishlist
                    </CardTitle>
                  </div>
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
                    /* --- EMPTY STATE (Point 5: Wajib Ada) --- */
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="py-24 text-center px-6"
                    >
                      <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <PackageSearch className="w-12 h-12 text-slate-300" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Belum Ada Barang Impian?</h3>
                      <p className="text-muted-foreground mb-8 max-w-xs mx-auto">Mulai jelajahi katalog kami dan temukan AC terbaik untuk kenyamanan Anda.</p>
                      <Button className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30">
                        Jelajahi Produk Sekarang
                      </Button>
                    </motion.div>
                  ) : (
                    items.map((item) => (
                      <motion.div 
                        layout
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="group relative flex flex-col md:flex-row items-center p-6 lg:p-8 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-all duration-500 gap-8"
                      >
                        {/* Point 1 & 7: Interaksi Image */}
                        <div className="relative w-full md:w-44 h-44 overflow-hidden rounded-2xl border bg-white dark:bg-slate-950 shadow-sm shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute top-2 left-2">
                             <Badge className="bg-white/90 dark:bg-slate-900/90 text-blue-600 backdrop-blur-md border-none shadow-sm text-[10px] font-bold">
                                {item.tag}
                             </Badge>
                          </div>
                        </div>

                        {/* INFO PRODUK (Point 1: Hierarki) */}
                        <div className="flex-1 space-y-3 w-full text-center md:text-left">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                              <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
                                {item.name}
                              </h3>
                              <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-400/10 text-yellow-600 rounded text-xs font-bold">
                                <Star size={12} className="fill-current" /> {item.rating}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 max-w-md">
                              {item.desc}
                            </p>
                          </div>

                          <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <p className="text-2xl font-black text-slate-900 dark:text-white">
                              Rp {item.price.toLocaleString('id-ID')}
                            </p>
                            <Badge variant="outline" className="w-fit mx-auto md:mx-0 text-[10px] uppercase border-emerald-200 text-emerald-600 bg-emerald-50/50">
                              ● {item.stock}
                            </Badge>
                          </div>
                        </div>

                        {/* AKSI (Point 2, 6, 10: Feedback & Alignment) */}
                        <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 pt-4 md:pt-0">
                          <Button 
                            onClick={() => addToCart(item.name)}
                            className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white gap-2 h-12 px-6 shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
                          >
                            <ShoppingCart className="w-4 h-4" /> 
                            <span className="font-bold uppercase text-xs tracking-wider">Beli Sekarang</span>
                          </Button>
                          
                          <Button 
                            onClick={() => removeItem(item.id, item.name)}
                            variant="ghost" 
                            className="h-12 w-12 md:w-full rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors gap-2"
                          >
                            <Trash2 className="w-5 h-5" />
                            <span className="md:hidden font-bold text-xs uppercase tracking-wider">Hapus</span>
                          </Button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </CardContent>

            <Separator className="bg-slate-100 dark:bg-slate-800" />
            
            <CardFooter className="bg-slate-50/50 dark:bg-slate-800/20 p-8 flex flex-col md:flex-row justify-between items-center gap-4">
               <div className="flex items-center gap-2 text-slate-400">
                  <ShieldCheck size={16} />
                  <p className="text-[11px] uppercase tracking-widest font-bold">
                    Transaksi Aman & Garansi Resmi
                  </p>
               </div>
               <Button variant="link" className="text-blue-600 font-bold gap-2 group">
                  Lanjut Belanja <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
               </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* --- SUB-COMPONENT SIDEBAR (Point 4) --- */
function SidebarItem({ icon, label, active = false, count }: { icon: React.ReactNode, label: string, active?: boolean, count?: number }) {
  return (
    <Button 
      variant="ghost" 
      className={cn(
        "group w-full justify-between h-12 px-4 rounded-xl transition-all duration-300",
        active 
          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:text-white" 
          : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
      )}
    >
      <div className="flex items-center gap-3 font-bold text-sm tracking-tight">
        {icon}
        {label}
      </div>
      {count !== undefined && (
        <span className={cn(
          "px-2 py-0.5 rounded-lg text-[10px] font-black",
          active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
        )}>
          {count}
        </span>
      )}
    </Button>
  );
}