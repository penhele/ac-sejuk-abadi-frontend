"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const pathname = usePathname();

  const menus = [
    { name: "Katalog Produk", path: "/admin/catalog" },
    { name: "Pesanan Masuk", path: "/admin/order" },
    { name: "Pengguna", path: "/admin/user" },
    { name: "Portofolio", path: "/admin/portofolio" },
    { name: "Blog Artikel", path: "/admin/article" },
    { name: "Pemasaran", path: "/admin/marketing" },
    { name: "Banner Iklan", path: "/admin/banner" },
    { name: "About Us", path: "/admin/about" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-2">
          {menus.map((menu, i) => (
            <Link key={i} href={menu.path}>
              <div
                className={`px-4 py-2 rounded-md cursor-pointer ${
                  pathname === menu.path
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-blue-600 hover:text-white"
                }`}
              >
                {menu.name}
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  );
}