"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WishlistItemProps {
  item: any;
  onRemove: (id: number, name: string) => void;
  onAddToCart: (name: string) => void;
}

export function WishlistItem({ item, onRemove, onAddToCart }: WishlistItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative flex flex-col md:flex-row items-center p-6 lg:p-8 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-all duration-500 gap-8"
    >
      {/* Image Section */}
      <div className="relative w-full md:w-44 h-44 overflow-hidden rounded-2xl border bg-white dark:bg-slate-950 shadow-sm shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2">
          <Badge className="bg-white/90 dark:bg-slate-900/90 text-blue-600 border-none text-[10px] font-bold">
            {item.tag}
          </Badge>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex-1 space-y-3 w-full text-center md:text-left">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
              {item.name}
            </h3>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-400/10 text-yellow-600 rounded text-xs font-bold">
              <Star size={12} className="fill-current" /> {item.rating}
            </div>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 max-w-md">{item.desc}</p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <p className="text-2xl font-black">Rp {item.price.toLocaleString("id-ID")}</p>
          <Badge variant="outline" className="w-fit mx-auto md:mx-0 text-[10px] border-emerald-200 text-emerald-600 bg-emerald-50/50">
            ● {item.stock}
          </Badge>
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 pt-4 md:pt-0">
        <Button
          onClick={() => onAddToCart(item.name)}
          className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white gap-2 h-12 px-6 active:scale-95 transition-all"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="font-bold uppercase text-xs">Beli Sekarang</span>
        </Button>
        <Button
          onClick={() => onRemove(item.id, item.name)}
          variant="ghost"
          className="h-12 w-12 md:w-full rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
          <span className="md:hidden font-bold text-xs uppercase ml-2">Hapus</span>
        </Button>
      </div>
    </motion.div>
  );
}