"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface ArticleCardProps {
  item: { title: string; description: string; image: string };
  onEdit: () => void;
  onDelete: () => void;
}

export function ArticleCard({ item, onEdit, onDelete }: ArticleCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-40 object-cover"
          />
        )}
        <div className="p-4">
          <h3 className="font-bold text-lg line-clamp-1">{item.title}</h3>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {item.description}
          </p>

          <div className="mt-4 flex gap-2">
            <button
              onClick={onEdit}
              className="flex-1 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground text-sm font-medium h-9 rounded-md hover:bg-secondary/80"
            >
              <Pencil className="w-3 h-3" /> Edit
            </button>
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