"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react"; // Tambahkan icon agar lebih pro

interface Column {
  label: string;
  key: string;
}

interface Props {
  data: any[];
  columns: Column[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

export default function DataTable({
  data,
  columns = [],
  onEdit,
  onDelete,
}: Props) {
  return (
    // Mengganti bg-white dengan bg-card agar otomatis mengikuti tema
    <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50/50 dark:bg-slate-800/50">
          <TableRow>
            {columns.map((col) => (
              <TableHead 
                key={col.key} 
                className="font-bold text-slate-700 dark:text-slate-300 uppercase text-[11px] tracking-wider"
              >
                {col.label}
              </TableHead>
            ))}
            <TableHead className="text-right font-bold text-slate-700 dark:text-slate-300 uppercase text-[11px] tracking-wider">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell 
                colSpan={columns.length + 1} 
                className="h-24 text-center text-muted-foreground"
              >
                Tidak ada data yang tersedia.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, i) => (
              <TableRow 
                key={i} 
                className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors"
              >
                {columns.map((col) => (
                  <TableCell 
                    key={col.key} 
                    className="py-4 text-slate-600 dark:text-slate-400 font-medium"
                  >
                    {item[col.key]}
                  </TableCell>
                ))}

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(item)}
                        className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                      >
                        <Edit2 size={14} className="mr-1" />
                        Edit
                      </Button>
                    )}

                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(item)}
                        className="h-8 px-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      >
                        <Trash2 size={14} className="mr-1" />
                        Hapus
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}