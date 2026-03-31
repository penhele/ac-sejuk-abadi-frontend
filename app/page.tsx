import { redirect } from "next/navigation";

export default function RootPage() {
  // Langsung alihkan navigasi ke halaman dashboard admin
  redirect("/admin/dashboard");
}