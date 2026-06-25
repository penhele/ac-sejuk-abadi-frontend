import Header from "@/components/layouts/header";
import { AppSidebar } from "@/components/layouts/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="flex-1 min-w-0">
        <Header />

        <div className="p-4">{children}</div>
      </div>
    </SidebarProvider>
  );
}
