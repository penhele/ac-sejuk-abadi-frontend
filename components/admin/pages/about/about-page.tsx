"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/src/services/api"; 
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, UserPlus, RefreshCw, Users, Share2, Plus, Building2, Trash2, Edit } from "lucide-react";

import AboutDialog from "@/components/admin/AboutDialog";
import { AboutCard } from "@/components/admin/shared/about-card";
import { SocialMediaForm } from "@/components/admin/forms/social-media-form";
import { CompanyForm } from "@/components/admin/forms/company-form"; 
import { toast } from "sonner";

export default function AboutPage() {
  // --- STATE DATA ---
  const [staffData, setStaffData] = useState<any[]>([]);
  const [socialData, setSocialData] = useState<any[]>([]);
  const [companyData, setCompanyData] = useState<any>(null);
  
  // --- STATE UI ---
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("company"); 
  const [isLoadingAction, setIsLoadingAction] = useState(false);

  // --- STATE MODALS ---
  const [openStaffModal, setOpenStaffModal] = useState(false);
  const [openSocialModal, setOpenSocialModal] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState<any>(null);

  // 1. Fetch Data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [staffRes, socialRes, companyRes] = await Promise.all([
        api.get("/staff"),
        api.get("/social-media"),
        api.get("/company")
      ]);
      setStaffData(staffRes.data?.data || staffRes.data || []);
      setSocialData(socialRes.data?.data || socialRes.data || []);
      setCompanyData(companyRes.data?.data || companyRes.data || null);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Gagal mengambil data terbaru.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // --- HANDLERS COMPANY ---
  const handleUpdateCompany = async (data: any) => {
    setIsLoadingAction(true);
    try {
      await api.put("/company", data);
      toast.success("Informasi perusahaan diperbarui.");
      fetchData();
    } catch (error) {
      toast.error("Gagal memperbarui informasi perusahaan.");
    } finally {
      setIsLoadingAction(false);
    }
  };

  const handleUploadLogo = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file); 
    
    setIsLoadingAction(true);
    try {
      await api.post("/company/logo", formData);
      
      toast.success("Logo berhasil diperbarui.");
      fetchData();
    } catch (error: any) {
      console.error("Upload error response:", error.response?.data);
      const msg = error.response?.data?.message || "Gagal mengupload logo.";
      toast.error(msg);
    } finally {
      setIsLoadingAction(false);
    }
  };

  // --- HANDLERS STAFF ---
  const handleAddStaff = async (item: any) => {
    try {
      await api.post("/staff", item);
      setOpenStaffModal(false);
      toast.success("Staff berhasil ditambahkan.");
      fetchData();
    } catch (error) { toast.error("Gagal menambahkan staff."); }
  };

  const handleDeleteStaff = async (id: any) => {
    if (!confirm("Hapus data staff ini?")) return;
    try {
      await api.delete(`/staff/${id}`);
      fetchData();
      toast.success("Staff berhasil dihapus.");
    } catch (error) { toast.error("Gagal menghapus staff."); }
  };

  // --- HANDLERS SOCIAL MEDIA ---
  const handleSocialSubmit = async (data: any) => {
    setIsLoadingAction(true);
    try {
      if (selectedSocial) {
        await api.put(`/social-media/${selectedSocial.id}`, data);
        toast.success("Sosial media diperbarui.");
      } else {
        await api.post("/social-media", data);
        toast.success("Sosial media ditambahkan.");
      }
      setOpenSocialModal(false);
      fetchData();
    } catch (error) { 
      toast.error("Gagal menyimpan data sosial media."); 
    } finally { 
      setIsLoadingAction(false); 
    }
  };

  const handleDeleteSocial = async (id: any, name: string) => {
    if (!confirm(`Hapus akun ${name}?`)) return;
    try {
      await api.delete(`/social-media/${id}`);
      toast.success(`${name} berhasil dihapus.`);
      fetchData();
    } catch (error) { 
      toast.error("Gagal menghapus sosial media."); 
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">About Management</h1>
          <p className="text-slate-500 text-sm italic">Kelola identitas perusahaan, tim, dan sosial media.</p>
        </div>
        <Button variant="outline" onClick={fetchData} disabled={loading} className="rounded-xl border-slate-200">
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Sync Data
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 rounded-xl p-1 bg-slate-100 h-12 max-w-xl">
          <TabsTrigger value="company" className="rounded-lg data-[state=active]:bg-white shadow-sm">
            <Building2 className="w-4 h-4 mr-2 text-indigo-500" /> Profil Perusahaan
          </TabsTrigger>
          <TabsTrigger value="staff" className="rounded-lg data-[state=active]:bg-white shadow-sm">
            <Users className="w-4 h-4 mr-2 text-blue-500" /> Staff Tim
          </TabsTrigger>
          <TabsTrigger value="social" className="rounded-lg data-[state=active]:bg-white shadow-sm">
            <Share2 className="w-4 h-4 mr-2 text-pink-500" /> Sosial Media
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-indigo-600" /></div>
          ) : (
            <CompanyForm 
              initialData={companyData} 
              onSubmit={handleUpdateCompany} 
              onLogoUpload={handleUploadLogo}
              isLoading={isLoadingAction} 
            />
          )}
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">Profil Anggota Tim</h2>
            <Button onClick={() => setOpenStaffModal(true)} className="bg-blue-600 hover:bg-blue-700 rounded-xl">
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
                  <TableHead>Icon</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {socialData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-10 text-slate-400 italic">Belum ada data sosial media.</TableCell>
                  </TableRow>
                ) : (
                  socialData.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-bold text-slate-700">{s.name}</TableCell>
                      <TableCell><code className="bg-slate-100 px-2 py-1 rounded text-[10px] text-slate-600">{s.icon}</code></TableCell>
                      <TableCell className="text-blue-600 truncate max-w-50 text-xs">{s.url}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => { setSelectedSocial(s); setOpenSocialModal(true); }} className="text-blue-600 hover:bg-blue-50"><Edit className="w-4 h-4"/></Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteSocial(s.id, s.name)} className="text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4"/></Button>
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

      <AboutDialog open={openStaffModal} setOpen={setOpenStaffModal} onSave={handleAddStaff} />
      <SocialMediaForm open={openSocialModal} onOpenChange={setOpenSocialModal} onSubmit={handleSocialSubmit} initialData={selectedSocial} isLoading={isLoadingAction} />
    </div>
  );
}