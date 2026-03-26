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
  X // Tambahkan icon X
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Efek untuk mengunci scroll body saat menu mobile terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const menus = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Katalog Produk", path: "/admin/catalog", icon: Package },
    { name: "Pesanan Masuk", path: "/admin/order", icon: ShoppingCart },
    { name: "Pengguna", path: "/admin/user", icon: Users },
    { name: "Portofolio", path: "/admin/portofolio", icon: ImageIcon },
    { name: "Blog Artikel", path: "/admin/article", icon: FileText },
    { name: "Pemasaran", path: "/admin/marketing", icon: Megaphone },
    { name: "Banner Iklan", path: "/admin/banner", icon: Monitor },
    { name: "About Us", path: "/admin/about", icon: Info },
  ];

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-slate-950 text-slate-50" : "bg-gray-50 text-slate-900"}`}>
      
      {/* 🔹 SIDEBAR OVERLAY (Mobile) */}
      <div 
        className={`fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* 🔹 SIDEBAR */}
      <aside
        className={`
          w-72 border-r p-6 fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out
          ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200 shadow-xl md:shadow-sm"}
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:w-64
        `}
      >
        {/* Header Sidebar (Mobile Only Close Button) */}
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className={`relative w-10 h-10 flex items-center justify-center rounded-xl border ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-blue-50 border-blue-100"}`}>
              <Monitor size={20} className="text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight uppercase">AC Sejuk</span>
              <span className="text-[10px] text-muted-foreground font-medium">ADMIN PANEL</span>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </Button>
        </div>

        {/* 🔹 NAVIGATION */}
        <nav className="space-y-1">
          {menus.map((menu, i) => {
            const Icon = menu.icon;
            const isActive = pathname === menu.path;

            return (
              <Link key={i} href={menu.path} onClick={() => setIsOpen(false)}>
                <div
                  className={`
                    flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all
                    ${isActive 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                      : isDarkMode 
                        ? "text-slate-400 hover:bg-slate-800 hover:text-white" 
                        : "text-slate-600 hover:bg-gray-100 hover:text-blue-600"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    <span>{menu.name}</span>
                  </div>
                  {isActive && <ChevronRight size={14} className="opacity-50" />}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer Sidebar (Optional) */}
        <div className="absolute bottom-6 left-6 right-6 md:hidden">
            <Button 
                variant="outline" 
                className="w-full justify-start gap-3 border-red-200 text-red-500 hover:bg-red-50"
                onClick={() => alert("Logout...")}
            >
                <LogOut size={18} /> Logout
            </Button>
        </div>
      </aside>

      {/* 🔹 MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 🔥 HEADER */}
        <header className={`h-16 border-b flex items-center justify-between px-4 md:px-6 sticky top-0 z-30 backdrop-blur-md
          ${isDarkMode ? "bg-slate-950/80 border-slate-800" : "bg-white/80 border-gray-200"}
        `}>
          
          <div className="flex items-center gap-3">
            <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden hover:bg-transparent" 
                onClick={() => setIsOpen(true)}
            >
              <Menu size={24} />
            </Button>
            <h2 className="text-sm font-bold truncate max-w-37.5 sm:max-w-none">
              {menus.find(m => m.path === pathname)?.name || "Management"}
            </h2>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* TOGGLE TEMA */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="rounded-full w-9 h-9 p-0 flex items-center justify-center"
            >
              {isDarkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
            </Button>

            <div className={`h-4 w-px mx-1 ${isDarkMode ? "bg-slate-800" : "bg-gray-200"}`} />

            <Button 
              variant="ghost" 
              size="sm" 
              className="text-red-500 hover:bg-red-50 px-2 sm:px-3 gap-2"
              onClick={() => alert("Logout...")}
            >
              <LogOut size={18} />
              <span className="hidden sm:inline font-semibold">Logout</span>
            </Button>
          </div>
        </header>

        {/* 🔹 CONTENT */}
        <main className="p-4 md:p-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}