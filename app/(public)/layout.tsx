import React from "react";

import Navbar from "@/components/navbar/navbar";
import QueryProvider from "@/components/providers/query-provider";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="">
      <Navbar />
      <main className="">
        <QueryProvider>{children}</QueryProvider>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
