"use client";

import { DataTable } from "@/components/tables/data-table";
import { Badge } from "@/components/ui/badge";
import useUsers from "@/features/user/hooks/use-users";
import { Shield } from "lucide-react";
import { userColumns } from "./user-columns";

export default function UsersPage() {
  const { data: users } = useUsers();

  return (
    <div className="space-y-6">
      <div className="shadow-2xl bg-linear-to-r text-white rounded-lg from-indigo-500 via-purple-500 to-pink-500 p-8">
        <div className="space-y-between-items-xs">
          <Badge variant={"outline"} className="text-white">
            Dashboard Admin
          </Badge>

          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Manajemen Pengguna
          </h1>
          <p className="text-sky-100">
            Kelola semua data pengguna, administrator, dan pelanggan.
          </p>
        </div>
      </div>

      <div className="space-y-between-items-sm">
        <div className="px-4 space-y-between-items-xs">
          <div className="flex flex-row gap-2 ">
            <Shield className="text-indigo-500" />
            <h1>Daftar Pengguna Terdaftar</h1>
          </div>

          <p className="text-muted-foreground text-sm">
            Menampilkan seluruh data pengguna beserta perannya dalam sistem.
          </p>
        </div>

        <DataTable columns={userColumns} data={users || []} />
      </div>
    </div>
  );
}
