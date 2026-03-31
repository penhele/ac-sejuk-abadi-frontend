import { Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OrderItem } from "@/types/order";

export function OrderItems({ items, total }: { items: OrderItem[], total: number }) {
  return (
    <Card className="border-none shadow-sm overflow-hidden dark:bg-slate-900">
      <CardHeader className="bg-muted/30">
        <CardTitle className="text-lg">Daftar Produk</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Produk</TableHead>
              <TableHead className="text-center">Jumlah</TableHead>
              <TableHead className="text-right pr-6">Harga</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="pl-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center border">
                      <Package className="text-slate-400" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-[11px] text-muted-foreground">Kategori: {item.category}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell className="text-right pr-6 font-medium">
                  Rp {item.price.toLocaleString("id-ID")}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-muted/20">
              <TableCell colSpan={2} className="text-right font-bold text-blue-600">Total Pembayaran</TableCell>
              <TableCell className="text-right pr-6 font-bold text-blue-600 text-lg">
                Rp {total.toLocaleString("id-ID")}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}