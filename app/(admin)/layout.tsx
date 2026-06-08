import Header from "@/components/layouts/header";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="w-full">
        <Header />

        <div className="p-4">{children}</div>
      </div>
    </SidebarProvider>
  );
}
