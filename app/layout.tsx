import React from "react";
import "./globals.css";

import { GooeyToaster } from "@/components/ui/goey-toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import QueryProvider from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={geist.className} suppressHydrationWarning>
      <body className="overflow-x-hidden" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <QueryProvider>{children}</QueryProvider>
            <GooeyToaster position="top-center" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
