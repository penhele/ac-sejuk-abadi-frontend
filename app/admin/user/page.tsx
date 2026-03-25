"use client";

import { useState } from "react";
import DataTable from "@/components/admin/DataTable";
import UserDialog from "@/components/admin/UserDialog";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [users, setUsers] = useState([
    { name: "Agung", email: "agung@mail.com", role: "Admin" },
  ]);

  const [open, setOpen] = useState(false);

  // 🔥 pindahin columns ke variable (biar stabil)
  const columns = [
    { label: "Nama", key: "name" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
  ];

  const handleAdd = (user: any) => {
    setUsers((prev) => [...prev, user]); // 🔥 best practice
  };

  const handleDelete = (user: any) => {
    setUsers((prev) => prev.filter((u) => u !== user));
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Data Pengguna</h1>

        <Button onClick={() => setOpen(true)}>
          + Tambah
        </Button>
      </div>

      <DataTable
        data={users}
        columns={columns} // 🔥 sekarang aman
        onDelete={handleDelete}
      />

      <UserDialog
        open={open}
        setOpen={setOpen}
        onSave={handleAdd}
      />
    </div>
  );
}