"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/admin/shared/badge"; // Gunakan Badge yang kita buat tadi
import { Trash2 } from "lucide-react";

interface AboutCardProps {
  item: any;
  onDelete: () => void;
}

export function AboutCard({ item, onDelete }: AboutCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col">
      {/* Multi Image Gallery Preview */}
      <div className="bg-muted p-2 grid grid-cols-2 gap-1 h-48">
        {item.images && item.images.slice(0, 4).map((img: string, idx: number) => (
          <div key={idx} className={`relative overflow-hidden rounded ${
            item.images.length === 1 ? "col-span-2 row-span-2" : 
            item.images.length === 2 ? "row-span-2" : ""
          }`}>
            <img src={img} className="w-full h-full object-cover" alt="portfolio" />
            {idx === 3 && item.images.length > 4 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold">
                +{item.images.length - 4} Lainnya
              </div>
            )}
          </div>
        ))}
      </div>

      <CardContent className="p-4 flex-1">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="capitalize">
            {item.section}
          </Badge>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-destructive h-8 w-8 hover:text-destructive hover:bg-destructive/10" 
            onClick={onDelete}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        
        <h3 className="font-bold text-lg">{item.title}</h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
          {item.description}
        </p>
      </CardContent>
    </Card>
  );
}