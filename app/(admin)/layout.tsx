import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="w-full px-default-page">
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  );
}
