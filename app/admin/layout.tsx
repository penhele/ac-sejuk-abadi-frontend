"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";
import {
  Package,
  ShoppingCart,
  Users,
  Image as ImageIcon,
  FileText,
  Megaphone,
  LayoutDashboard,
  Info,
  LogOut,
  Sun,
  Moon,
  Menu,
  Monitor,
  ChevronRight,
  MessageSquare, // Import ikon untuk Review
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetHeader,
  SheetTitle 
} from "@/components/ui/sheet";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Update daftar menu
  const menus = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Katalog Produk", path: "/admin/catalog", icon: Package },
    { name: "Pesanan Masuk", path: "/admin/order", icon: ShoppingCart },
    { name: "Pengguna", path: "/admin/user", icon: Users },
    { name: "Review Pelanggan", path: "/admin/review", icon: MessageSquare }, // Menu baru
    { name: "Portofolio", path: "/admin/portofolio", icon: ImageIcon },
    { name: "Blog Artikel", path: "/admin/article", icon: FileText },
    { name: "Pemasaran", path: "/admin/marketing", icon: Megaphone },
    { name: "Banner Iklan", path: "/admin/banner", icon: Monitor },
    { name: "About Us", path: "/admin/about", icon: Info },
  ];

  // Helper untuk Logo & Brand
  const BrandLogo = () => (
    <div className="flex items-center gap-3 px-2">
      <div className={`relative w-10 h-10 shrink-0 flex items-center justify-center rounded-xl border overflow-hidden
        ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-blue-50 border-blue-100"}`}
      >
        <img 
          src="/logo.png" 
          alt="Logo"
          className="w-full h-full object-contain p-1.5 z-10"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-sm font-bold tracking-tight uppercase leading-none">AC Sejuk Abadi</span>
        <span className="text-[10px] text-muted-foreground font-medium mt-1.5 tracking-wider">
          ADMIN PANEL
        </span>
      </div>
    </div>
  );

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${isDarkMode ? "dark bg-slate-950 text-slate-50" : "bg-gray-50 text-slate-900"}`}>
      
      {/* 🔹 SIDEBAR DESKTOP */}
      <aside className="hidden md:flex w-64 border-r flex-col p-6 sticky top-0 h-screen bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
        <div className="mb-10">
          <BrandLogo />
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          {menus.map((menu, i) => {
            const Icon = menu.icon;
            const isActive = pathname === menu.path;

            return (
              <Link key={i} href={menu.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-between px-4 py-6 rounded-xl transition-all ${
                    isActive 
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="font-semibold text-sm">{menu.name}</span>
                  </div>
                  {isActive && <ChevronRight size={14} className="opacity-50" />}
                </Button>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* 🔹 MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b flex items-center justify-between px-4 md:px-6 sticky top-0 z-30 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            {/* MOBILE HAMBURGER */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-6 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800">
                <SheetHeader className="mb-10">
                  <SheetTitle>
                    <BrandLogo />
                  </SheetTitle>
                </SheetHeader>
                <nav className="space-y-1">
                  {menus.map((menu, i) => {
                    const Icon = menu.icon;
                    const isActive = pathname === menu.path;
                    return (
                      <Link key={i} href={menu.path} onClick={() => setIsOpen(false)}>
                         <Button
                          variant={isActive ? "default" : "ghost"}
                          className={`w-full justify-between px-4 py-6 rounded-xl ${
                            isActive ? "bg-blue-600 text-white" : ""
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon size={20} />
                            <span>{menu.name}</span>
                          </div>
                        </Button>
                      </Link>
                    );
                  })}
                </nav>
                <div className="absolute bottom-6 left-6 right-6">
                  <Button variant="outline" className="w-full gap-3 border-red-200 text-red-500 hover:bg-red-50" onClick={() => alert("Logout...")}>
                    <LogOut size={18} /> Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <h2 className="text-sm font-bold uppercase tracking-wide">
              {menus.find(m => m.path === pathname)?.name || "Management"}
            </h2>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)} className="rounded-full w-9 h-9">
              {isDarkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
            </Button>

            <Separator orientation="vertical" className="h-4 mx-1" />

            <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600 gap-2" onClick={() => alert("Logout...")}>
              <LogOut size={18} />
              <span className="hidden sm:inline font-bold">Logout</span>
            </Button>
          </div>
        </header>

        <main className="p-4 md:p-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}