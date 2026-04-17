import "./globals.css";
import React from "react";

import { Geist } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
const geist = Geist({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={geist.className}>
      <body>
        <TooltipProvider>
          <main>{children}</main>
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
