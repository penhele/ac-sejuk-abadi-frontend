import React from "react";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Separator } from "@/components/ui/separator";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <nav>
        <Navbar />
      </nav>

      <main className="min-h-">{children}</main>

      <Separator />

      <footer>
        <Footer />
      </footer>
    </>
  );
}
