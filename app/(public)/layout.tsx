import React from "react";

import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="">
      <Navbar />
      {children}
      {/* <Footer /> */}
    </div>
  );
}
