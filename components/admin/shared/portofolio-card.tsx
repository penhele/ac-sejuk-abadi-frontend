"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Briefcase, MapPin, Tag } from "lucide-react";
import { Portfolio } from "@/types/portofolio";

interface PortfolioCardProps {
  item: Portfolio;
  onEdit: () => void;
  onDelete: () => void;
}

export function PortfolioCard({ item, onEdit, onDelete }: PortfolioCardProps) {
  return (
    <Card className="overflow-hidden border-2 hover:shadow-lg transition-all group rounded-xl bg-white">
      <CardContent className="p-0">
        {/* Container Gambar */}
        <div className="relative h-48 bg-slate-100">
          {item.images && item.images.length > 0 ? (
            <>
              <img 
                src={typeof item.images[0] === 'string' ? item.images[0] : URL.createObjectURL(item.images[0])} 
                alt="cover" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              
              {item.images.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm font-bold border border-white/20">
                  +{item.images.length - 1} Foto
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Briefcase className="opacity-20 w-10 h-10 text-slate-400" />
            </div>
          )}
          
          {/* Badge ID Produk */}
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] px-2 py-1 rounded-md font-bold shadow-lg">
            {item.id_product}
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-bold text-lg truncate text-slate-800 leading-tight">
              {item.name}
            </h3>
            
            {/* Info Lokasi & Kategori */}
            <div className="flex flex-wrap gap-2 mt-2">
              {item.location && (
                <div className="flex items-center text-[10px] text-slate-500 gap-1">
                  <MapPin className="w-3 h-3 text-blue-500" /> {item.location}
                </div>
              )}
              {item.category && (
                <div className="flex items-center text-[10px] text-slate-500 gap-1">
                  <Tag className="w-3 h-3 text-blue-500" /> {item.category}
                </div>
              )}
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 h-10 leading-relaxed">
            {item.description || "Tidak ada deskripsi proyek."}
          </p>
          
          <div className="pt-2 flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 rounded-xl border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors" 
              onClick={onEdit}
            >
              <Pencil className="w-3 h-3 mr-2" /> Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="px-3 rounded-xl border-slate-200 text-slate-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200" 
              onClick={onDelete}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}