"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface BannerCardProps {
  item: { title: string; description: string; image: string };
  onEdit: () => void;
  onDelete: () => void;
}

export function BannerCard({ item, onEdit, onDelete }: BannerCardProps) {
  return (
    <Card className="overflow-hidden group">
      <CardContent className="p-0">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg line-clamp-1">{item.title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {item.description}
          </p>

          <div className="mt-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-2"
              onClick={onEdit}
            >
              <Pencil className="w-3 h-3" /> Edit
            </Button>

            <Button
              variant="destructive"
              size="sm"
              className="flex-1 gap-2"
              onClick={onDelete}
            >
              <Trash2 className="w-3 h-3" /> Hapus
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}