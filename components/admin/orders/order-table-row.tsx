import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Printer, ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";
import { Order } from "@/types/order";

export function OrderTableRow({ order }: { order: Order }) {
  const statusStyles: Record<string, string> = {
    Selesai: "bg-green-500 hover:bg-green-600 text-white border-none",
    Diproses: "bg-amber-500 hover:bg-amber-600 text-white border-none",
    Pending: "bg-red-500 hover:bg-red-600 text-white border-none",
  };

  return (
    <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
      <TableCell className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
        {order.id}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" />
          {order.date}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-semibold text-sm">{order.customer}</span>
          <span className="text-[10px] text-muted-foreground">{order.email}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{order.detail}</span>
          <span className="text-[10px] uppercase text-slate-400 font-bold">{order.productType}</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusStyles[order.status]}`}>
          {order.status}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          {order.status !== "Pending" && (
            <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-600" onClick={() => window.print()}>
              <Printer className="w-4 h-4" />
            </Button>
          )}
          <Button asChild variant="outline" size="sm" className="h-8 gap-1.5 shadow-sm text-xs font-bold">
            <Link href={`/admin/orders/${order.id}`}>
              <ExternalLink className="w-3.5 h-3.5" /> Detail
            </Link>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}