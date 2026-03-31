import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Briefcase } from "lucide-react";
import { Portfolio } from "@/types/portofolio";

interface PortfolioCardProps {
  item: Portfolio;
  onEdit: () => void;
  onDelete: () => void;
}

export function PortfolioCard({ item, onEdit, onDelete }: PortfolioCardProps) {
  return (
    <Card className="overflow-hidden border-2 hover:shadow-lg transition-all group rounded-xl">
      <CardContent className="p-0">
        <div className="relative h-48 bg-slate-100">
          {item.images.length > 0 ? (
            <>
              <img src={item.images[0]} alt="cover" className="w-full h-full object-cover" />
              {item.images.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm font-bold">
                  +{item.images.length - 1} Foto Lainnya
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Briefcase className="opacity-20 w-10 h-10" />
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg truncate text-slate-800">{item.title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2 h-10">
            {item.description}
          </p>
          
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 rounded-lg" onClick={onEdit}>
              <Pencil className="w-3 h-3 mr-2" /> Edit
            </Button>
            <Button variant="destructive" size="sm" className="px-3 rounded-lg" onClick={onDelete}>
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}