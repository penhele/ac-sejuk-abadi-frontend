"use client";

import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { User } from "@/types/user";

interface UserTableProps {
  data: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export function UserTable({ data, onEdit, onDelete }: UserTableProps) {
  return (
    <div className="rounded-xl border bg-white dark:bg-slate-900 overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
          <TableRow>
            <TableHead className="font-bold">Nama & Email</TableHead>
            <TableHead className="font-bold">Role</TableHead>
            <TableHead className="font-bold">Status</TableHead>
            <TableHead className="font-bold text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-bold text-sm">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="rounded-md font-medium px-2 py-0">
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${user.status === "Active" ? "bg-green-500" : "bg-slate-300"}`} />
                  <span className="text-sm">{user.status}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600" onClick={() => onEdit(user)}>
                    <Pencil size={14} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => onDelete(user.id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}