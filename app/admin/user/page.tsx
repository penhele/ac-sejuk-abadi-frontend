"use client";

import { useState } from "react";
import { UserTable } from "@/components/admin/tables/user-table";
import { UserForm } from "@/components/admin/forms/user-form";
import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Plus, Search, UserCheck } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "Budi Santoso", email: "budi@mail.com", phone: "0812", role: "Admin", status: "Active", createdAt: "2024-01-01" },
    { id: "2", name: "Siti Aminah", email: "siti@mail.com", phone: "0813", role: "Customer", status: "Active", createdAt: "2024-01-02" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState<Partial<User>>({});

  const handleAdd = () => {
    setForm({ role: "Customer", status: "Active" });
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEdit = (user: User) => {
    setForm(user);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus pengguna ini?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSave = () => {
    if (isEdit) {
      setUsers(users.map(u => u.id === form.id ? (form as User) : u));
    } else {
      const newUser = { ...form, id: Date.now().toString(), createdAt: new Date().toISOString() } as User;
      setUsers([newUser, ...users]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Pengguna</h1>
          <p className="text-muted-foreground text-sm">Kelola akses admin, teknisi, dan data pelanggan.</p>
        </div>
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 rounded-xl">
          <Plus size={18} className="mr-2" /> Tambah Pengguna
        </Button>
      </div>

      {/* Stats Mini */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border bg-white dark:bg-slate-900 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600"><UserCheck size={20}/></div>
          <div><p className="text-xs text-muted-foreground uppercase font-bold">Total User</p><p className="text-xl font-bold">{users.length}</p></div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <Input placeholder="Cari nama atau email..." className="pl-10 rounded-xl bg-white dark:bg-slate-900" />
        </div>
      </div>

      <UserTable data={users} onEdit={handleEdit} onDelete={handleDelete} />

      <UserForm 
        open={showModal} 
        onOpenChange={setShowModal} 
        form={form} 
        setForm={setForm} 
        onSubmit={handleSave} 
        isEdit={isEdit} 
      />
    </div>
  );
}