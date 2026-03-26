"use client";

import { 
  Heart, ShoppingCart, Trash2, ArrowRight, 
  User, ShieldCheck
} from "lucide-react";
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

export default function WishlistPage() {
  const wishlist = [
    { 
      id: 1,
      name: 'AC Panasonic 1 PK', 
      desc: 'Inverter hemat energi dengan pemurni udara nanoe-G.', 
      price: 'Rp 4.500.000', 
      // Tambahkan URL gambar di sini
      image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=200&auto=format&fit=crop",
      tag: "Terlaris" 
    },
    { 
      id: 2,
      name: 'AC Daikin 1.5 PK', 
      desc: 'Pendinginan super cepat dengan teknologi Thailand terbaru.', 
      price: 'Rp 5.200.000', 
      image: "https://images.unsplash.com/photo-1591189863430-ab87e120f312?q=80&w=200&auto=format&fit=crop",
      tag: "Hemat Listrik"
    }
  ];

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* --- SIDEBAR NAV --- */}
        <aside className="w-full md:w-64 space-y-2">
          <div className="px-3 py-2">
            <h2 className="mb-4 text-lg font-semibold tracking-tight text-blue-600 dark:text-blue-400">
              Pengaturan Akun
            </h2>
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-3 opacity-60 hover:opacity-100 transition-all">
                <User size={18} /> Profil Pribadi
              </Button>
              <Button variant="secondary" className="w-full justify-start gap-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                <Heart size={18} className="text-red-500 fill-red-500" /> Wishlist
              </Button>
            </nav>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-1">
          <Card className="border-none shadow-xl shadow-blue-500/5 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="h-2 bg-red-500 w-full" /> 
            
            <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b dark:border-slate-800 pb-8">
              <div className="flex flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-red-500">
                    <Heart size={20} className="fill-current" />
                    <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Wishlist Saya
                    </CardTitle>
                  </div>
                  <CardDescription>
                    Anda memiliki <span className="font-bold text-blue-600">{wishlist.length} produk</span> favorit.
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                  Lihat Semua <ArrowRight size={14} />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-8 flex flex-col gap-6">
              {wishlist.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <Heart className="w-12 h-12 text-slate-200 mx-auto" />
                  <p className="text-muted-foreground">Wishlist Anda masih kosong.</p>
                </div>
              ) : (
                wishlist.map((item) => (
                  <div 
                    key={item.id} 
                    className="group flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-2xl hover:border-blue-200 dark:hover:border-blue-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all duration-300 gap-4"
                  >
                    {/* INFO PRODUK DENGAN IMAGE */}
                    <div className="flex gap-5 items-center">
                      <div className="relative w-24 h-24 overflow-hidden rounded-xl border bg-white dark:bg-slate-950 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-800 dark:text-slate-100 uppercase text-xs tracking-wider">
                            {item.name}
                          </h3>
                          <Badge className="text-[9px] px-2 py-0 h-4 bg-blue-50 text-blue-600 dark:bg-blue-900/30 border-none">
                            {item.tag}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 max-w-[300px]">
                          {item.desc}
                        </p>
                        <p className="text-lg font-black text-blue-600 dark:text-blue-400 mt-1">
                          {item.price}
                        </p>
                      </div>
                    </div>

                    {/* AKSI */}
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button 
                        className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-lg shadow-blue-500/20"
                        size="sm"
                      >
                        <ShoppingCart className="w-4 h-4" /> + Keranjang
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-9 w-9 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 dark:border-red-900 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>

            <Separator className="bg-slate-100 dark:bg-slate-800" />
            
            <CardFooter className="bg-slate-50/50 dark:bg-slate-800/30 p-6 flex flex-col items-center gap-2">
               <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold text-center">
                Jaminan Produk Original & Garansi Resmi
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}