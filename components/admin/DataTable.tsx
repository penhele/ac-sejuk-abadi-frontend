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
  columns = [], // 🔥 INI PENTING BANGET
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <Table>
        {/* 🔥 HEADER */}
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key}>{col.label}</TableHead>
            ))}
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>

        {/* 🔥 BODY */}
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1} className="text-center">
                Tidak ada data
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, i) => (
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {item[col.key]}
                  </TableCell>
                ))}

                <TableCell className="flex gap-2">
                  {onEdit && (
                    <Button
                      variant="outline"
                      onClick={() => onEdit(item)}
                    >
                      Edit
                    </Button>
                  )}

                  {onDelete && (
                    <Button
                      variant="destructive"
                      onClick={() => onDelete(item)}
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}