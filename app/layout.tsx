import "./globals.css";
import React from "react";

import { Geist } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import QueryProvider from "@/components/providers/query-provider";
const geist = Geist({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={geist.className}>
      <body className="overflow-x-hidden">
        <TooltipProvider>
          <QueryProvider>{children}</QueryProvider>
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
