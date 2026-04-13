"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/src/services/api"; 
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, UserPlus, RefreshCw, Users, Share2, Plus, Globe, Trash2, Edit } from "lucide-react";

import AboutDialog from "@/components/admin/AboutDialog";
import { AboutCard } from "@/components/admin/shared/about-card";
import { SocialMediaForm } from "@/components/admin/forms/social-media-form"; // Import baru

export default function AboutPage() {
  // --- STATE DATA ---
  const [staffData, setStaffData] = useState<any[]>([]);
  const [socialData, setSocialData] = useState<any[]>([]);
  
  // --- STATE UI ---
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("staff");
  const [isLoadingAction, setIsLoadingAction] = useState(false);

  // --- STATE MODALS ---
  const [openStaffModal, setOpenStaffModal] = useState(false);
  const [openSocialModal, setOpenSocialModal] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState<any>(null);

  // 1. Fetch Data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [staffRes, socialRes] = await Promise.all([
        api.get("/staff"),
        api.get("/social-media") // Sesuaikan endpoint Anda
      ]);
      setStaffData(staffRes.data?.data || staffRes.data || []);
      setSocialData(socialRes.data?.data || socialRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // --- HANDLERS STAFF ---
  const handleAddStaff = async (item: any) => {
    try {
      await api.post("/staff", item);
      setOpenStaffModal(false);
      fetchData();
    } catch (error) { alert("Gagal menambahkan staff."); }
  };

  const handleDeleteStaff = async (id: any) => {
    if (!confirm("Hapus data staff ini?")) return;
    try {
      await api.delete(`/staff/${id}`);
      fetchData();
    } catch (error) { alert("Gagal menghapus staff."); }
  };

  // --- HANDLERS SOCIAL MEDIA ---
  const handleSocialSubmit = async (data: any) => {
    setIsLoadingAction(true);
    try {
      if (selectedSocial) {
        await api.put(`/social-media/${selectedSocial.id}`, data);
      } else {
        await api.post("/social-media", data);
      }
      setOpenSocialModal(false);
      fetchData();
    } catch (error) {
      alert("Gagal menyimpan data sosial media.");
    } finally {
      setIsLoadingAction(false);
    }
  };

  const handleDeleteSocial = async (id: any, name: string) => {
    if (!confirm(`Hapus akun ${name}?`)) return;
    try {
      await api.delete(`/social-media/${id}`);
      fetchData();
    } catch (error) { alert("Gagal menghapus sosial media."); }
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">About Management</h1>
          <p className="text-slate-500 text-sm italic">Kelola identitas tim dan kehadiran digital perusahaan.</p>
        </div>
        <Button variant="outline" onClick={fetchData} disabled={loading} className="rounded-xl">
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Sync Data
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 rounded-xl p-1 bg-slate-100 h-12 max-w-md">
          <TabsTrigger value="staff" className="rounded-lg data-[state=active]:bg-white shadow-sm">
            <Users className="w-4 h-4 mr-2 text-blue-500" /> Staff Tim
          </TabsTrigger>
          <TabsTrigger value="social" className="rounded-lg data-[state=active]:bg-white shadow-sm">
            <Share2 className="w-4 h-4 mr-2 text-pink-500" /> Sosial Media
          </TabsTrigger>
        </TabsList>

        {/* --- TAB STAFF --- */}
        <TabsContent value="staff" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">Profil Anggota Tim</h2>
            <Button onClick={() => setOpenStaffModal(true)} className="bg-blue-600 rounded-xl">
              <UserPlus className="w-4 h-4 mr-2" /> Tambah Staff
            </Button>
          </div>
          
          {loading ? (
             <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {staffData.map((item) => (
                <AboutCard key={item.id} item={item} onDelete={() => handleDeleteStaff(item.id)} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* --- TAB SOSIAL MEDIA --- */}
        <TabsContent value="social" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">Link Sosial Media</h2>
            <Button onClick={() => { setSelectedSocial(null); setOpenSocialModal(true); }} className="bg-pink-600 hover:bg-pink-700 rounded-xl">
              <Plus className="w-4 h-4 mr-2" /> Tambah Link
            </Button>
          </div>

          <Card className="rounded-2xl overflow-hidden border shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Platform</TableHead>
                  <TableHead>Username/Icon</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {socialData.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-10 text-slate-400">Belum ada link sosial media.</TableCell></TableRow>
                ) : (
                  socialData.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-bold">{s.name}</TableCell>
                      <TableCell><code className="bg-slate-100 px-2 py-1 rounded text-xs">{s.icon}</code></TableCell>
                      <TableCell className="text-blue-600 truncate max-w-[200px]">{s.url}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => { setSelectedSocial(s); setOpenSocialModal(true); }} className="text-blue-600"><Edit className="w-4 h-4"/></Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteSocial(s.id, s.name)} className="text-red-600"><Trash2 className="w-4 h-4"/></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      {/* MODALS */}
      <AboutDialog open={openStaffModal} setOpen={setOpenStaffModal} onSave={handleAddStaff} />
      <SocialMediaForm 
        open={openSocialModal} 
        onOpenChange={setOpenSocialModal} 
        onSubmit={handleSocialSubmit} 
        initialData={selectedSocial}
        isLoading={isLoadingAction}
      />
    </div>
  );
}