"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Tag, Calendar, ImageIcon } from "lucide-react";

interface ArticleCardProps {
  item: { 
    id: number;
    name: string; 
    description: string; 
    category: string;
    created_at?: string;
    images?: any[] 
  };
  onEdit: () => void;
  onDelete: () => void;
}

export function ArticleCard({ item, onEdit, onDelete }: ArticleCardProps) {
  /**
   * Mengambil gambar pertama:
   * 1. Cek jika images adalah array dan memiliki isi.
   * 2. Ambil .url jika object, atau langsung nilainya jika string.
   */
  const displayImage = item.images && item.images.length > 0 
    ? (typeof item.images[0] === 'object' ? item.images[0].url : item.images[0]) 
    : null;

  const formattedDate = item.created_at 
    ? new Date(item.created_at).toLocaleDateString("id-ID", { 
        day: "numeric", 
        month: "short", 
        year: "numeric" 
      })
    : "Baru saja";

  return (
    <Card className="overflow-hidden group border-slate-100 bg-white hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 rounded-[2.5rem]">
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative h-52 w-full overflow-hidden bg-slate-50">
          {displayImage ? (
            <img
              src={displayImage}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
              <ImageIcon className="w-10 h-10 mb-2 opacity-20" />
              <span className="text-[10px] font-medium uppercase tracking-tighter">No Preview</span>
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <div className="bg-white/80 backdrop-blur-xl px-4 py-1.5 rounded-2xl flex items-center gap-2 shadow-sm border border-white/50">
              <Tag className="w-3 h-3 text-blue-600" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-800">
                {item.category || "Umum"}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="flex items-center gap-2 text-slate-400 text-[10px] mb-3 font-medium">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>

          <h3 className="font-bold text-slate-900 text-lg leading-tight line-clamp-2 min-h-14 group-hover:text-blue-600 transition-colors">
            {item.name}
          </h3>
          
          <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed font-medium">
            {item.description || "Panduan dan informasi terbaru dari tim AC Sejuk Abadi."}
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="flex-1 gap-2 rounded-2xl border-slate-200 bg-white hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 font-bold h-11"
            >
              <Pencil className="w-3.5 h-3.5" /> Edit
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="flex-1 gap-2 rounded-2xl text-red-500 bg-red-50 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold h-11"
            >
              <Trash2 className="w-3.5 h-3.5" /> Hapus
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}