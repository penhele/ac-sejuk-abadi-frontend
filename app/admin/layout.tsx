"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
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
  ChevronRight
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
      
      {/* 🔹 SIDEBAR */}
      <aside
        className={`
          w-64 border-r p-6 fixed top-0 left-0 h-full z-50 transition-all
          ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200 shadow-sm"}
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0
        `}
      >
        {/* 🔹 LOGO SECTION */}
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className={`relative w-10 h-10 flex items-center justify-center rounded-xl shadow-sm overflow-hidden border
            ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-blue-50 border-blue-100"}`}
          >
            <img 
              src="/logo.png" 
              alt="Logo"
              className="w-full h-full object-contain p-1.5 z-10"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Icon Fallback jika gambar logo tidak ditemukan */}
            <Monitor size={20} className="absolute text-blue-600 opacity-20" />
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight">AC Sejuk Abadi</span>
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mt-1">
              Admin Panel
            </span>
          </div>
        </div>

        {/* 🔹 NAVIGATION */}
        <nav className="space-y-1.5">
          {menus.map((menu, i) => {
            const Icon = menu.icon;
            const isActive = pathname === menu.path;

            return (
              <Link key={i} href={menu.path} onClick={() => setIsOpen(false)}>
                <div
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group
                    ${isActive 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                      : isDarkMode 
                        ? "text-slate-400 hover:bg-slate-800 hover:text-white" 
                        : "text-slate-600 hover:bg-gray-100 hover:text-blue-600"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                    <span>{menu.name}</span>
                  </div>
                  {isActive && <ChevronRight size={14} opacity={0.5} />}
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* 🔹 MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 🔥 HEADER */}
        <header className={`h-16 border-b flex items-center justify-between px-6 sticky top-0 z-30 backdrop-blur-md
          ${isDarkMode ? "bg-slate-950/80 border-slate-800" : "bg-white/80 border-gray-200"}
        `}>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(true)}>
              <Menu size={20} />
            </Button>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground hidden sm:block">
              {menus.find(m => m.path === pathname)?.name || "Management"}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* TOGGLE TEMA */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`rounded-full gap-2 px-3 ${isDarkMode ? "hover:bg-slate-800 text-slate-300" : "hover:bg-gray-100 text-slate-600"}`}
            >
              {isDarkMode ? (
                <><Sun size={16} className="text-yellow-400" /> <span className="text-xs">Terang</span></>
              ) : (
                <><Moon size={16} /> <span className="text-xs">Gelap</span></>
              )}
            </Button>

            <div className={`h-4 w-px mx-2 ${isDarkMode ? "bg-slate-800" : "bg-gray-200"}`} />

            {/* TOMBOL LOGOUT */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-red-500 hover:bg-red-50 hover:text-red-600 gap-2 font-semibold transition-colors"
              onClick={() => alert("Logging out...")}
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </header>

        {/* 🔹 CONTENT */}
        <main className="p-6 md:p-10 transition-all">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm md:hidden z-40 transition-opacity" 
          onClick={() => setIsOpen(false)} 
        />
      )}
    </div>
  );
}