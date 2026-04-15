import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Pencil } from "lucide-react";
import { PromoItem } from "@/types/marketing";

export function DiscountCard({ item, onEdit, onDelete }: { item: PromoItem; onEdit: () => void; onDelete: () => void }) {
  return (
    <Card className="overflow-hidden group hover:shadow-md transition-shadow">
      <div className="relative h-40 bg-muted">
        {item.image && <img src={item.image} className="w-full h-full object-cover" alt={item.title} />}
        <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 shadow-lg">
          {item.percent}% OFF
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg line-clamp-1">{item.title}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2 h-10">{item.description}</p>
        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={onEdit}>Edit</Button>
          <Button variant="destructive" size="sm" onClick={onDelete}><Trash2 className="w-4 h-4" /></Button>
        </div>
      </CardContent>
    </Card>
  );
}
