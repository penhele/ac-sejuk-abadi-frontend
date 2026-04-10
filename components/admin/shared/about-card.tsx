"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, User, Mail, ExternalLink } from "lucide-react";

interface AboutCardProps {
  item: {
    id: number | string;
    name: string;
    role: string;
    image_url?: string | null;
  };
  onDelete: () => void;
}

export function AboutCard({ item, onDelete }: AboutCardProps) {
  return (
    <Card className="group overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 rounded-3xl bg-white">
      <CardContent className="p-0">
        {/* Bagian Atas: Background & Avatar */}
        <div className="relative h-24 bg-gradient-to-r from-blue-500 to-blue-700">
          <div className="absolute -bottom-10 left-6">
            <div className="relative w-20 h-20 rounded-2xl border-4 border-white overflow-hidden bg-slate-100 shadow-sm">
              {item.image_url ? (
                <img 
                  src={item.image_url} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100">
                  <User className="w-8 h-8 text-slate-300" />
                </div>
              )}
            </div>
          </div>
          
          {/* Action Button: Delete diletakkan di pojok kanan atas agar tidak offside */}
          <div className="absolute top-3 right-3">
            <Button 
              variant="secondary" 
              size="icon" 
              className="h-8 w-8 rounded-xl bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-red-500 hover:text-white transition-all shadow-sm" 
              onClick={onDelete}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Bagian Bawah: Info Staff */}
        <div className="pt-12 p-6">
          <div className="mb-4">
            <h3 className="font-black text-slate-800 text-lg leading-tight group-hover:text-blue-600 transition-colors">
              {item.name || "Nama Staff"}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none font-bold text-[10px] px-2 py-0.5 rounded-lg uppercase tracking-wider">
                {item.role || "Staff"}
              </Badge>
            </div>
          </div>

          <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">
            Anggota tim profesional yang berkontribusi dalam operasional harian perusahaan.
          </p>

          {/* Footer Card */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
            <span className="text-[10px] font-mono font-bold text-slate-300 uppercase">
              ID: {item.id?.toString().padStart(3, '0')}
            </span>
            <div className="flex gap-1">
              <div className="h-1 w-4 rounded-full bg-blue-100" />
              <div className="h-1 w-1 rounded-full bg-blue-100" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}