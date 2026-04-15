"use client";

import { useState, useEffect } from "react";
import { UserTable } from "@/components/admin/tables/user-table";
import { UserForm } from "@/components/admin/forms/user-form";
import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Plus, Search, UserCheck, Loader2, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";

const API_URL = '/api-backend/api';

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState<Partial<User>>({});

  // 1. FUNGSI GET DATA DARI API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      
      const token = localStorage.getItem("token");
      
      const response = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
     
      setUsers(Array.isArray(response.data) ? response.data : response.data.users || []);
    } catch (err: any) {
      console.error("Fetch Error:", err);
      setError("Gagal mengambil data pengguna. Pastikan server aktif.");
    } finally {
      setLoading(false);
    }
  };

  // 2. LOAD DATA SAAT PERTAMA KALI HALAMAN DIBUKA
  useEffect(() => {
    fetchUsers();
  }, []);

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

  const handleDelete = async (id: string) => {
    if (confirm("Hapus pengguna ini?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_URL}/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchUsers();
      } catch (err) {
        alert("Gagal menghapus pengguna.");
      }
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (isEdit) {
        await axios.put(`${API_URL}/users/${form.id}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_URL}/users`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setShowModal(false);
      fetchUsers(); 
    } catch (err) {
      alert("Gagal menyimpan data.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Pengguna</h1>
          <p className="text-muted-foreground text-sm">Kelola akses admin, teknisi, dan data pelanggan.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchUsers} disabled={loading}>
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </Button>
          <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 rounded-xl">
            <Plus size={18} className="mr-2" /> Tambah Pengguna
          </Button>
        </div>
      </div>

      {/* Stats Mini */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border bg-white dark:bg-slate-900 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600"><UserCheck size={20}/></div>
          <div>
            <p className="text-xs text-muted-foreground uppercase font-bold">Total User</p>
            <p className="text-xl font-bold">{loading ? "..." : users.length}</p>
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <Input placeholder="Cari nama atau email..." className="pl-10 rounded-xl bg-white dark:bg-slate-900" />
        </div>
      </div>

      {/* TAMPILAN LOADING / ERROR / TABLE */}
      {error ? (
        <div className="p-8 text-center bg-red-50 border border-red-100 rounded-xl text-red-600">
          {error}
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center p-20 space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="text-slate-500 animate-pulse">Mengambil data dari server...</p>
        </div>
      ) : (
        <UserTable data={users} onEdit={handleEdit} onDelete={handleDelete} />
      )}

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