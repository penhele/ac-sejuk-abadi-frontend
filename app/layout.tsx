import "./globals.css";
import React from "react";

import { Geist } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import PromoBar from "@/components/promo-bar";
import Footer from "@/components/footer/footer";

const geist = Geist({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={geist.className}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
