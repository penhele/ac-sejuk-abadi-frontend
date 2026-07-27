"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/constants/routes";
import { useAuthToken } from "@/features/auth/hooks";
import {
  AirVent,
  BookOpen,
  BotMessageSquare,
  Building2,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Package,
  Settings2,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function AppSidebar() {
  const navItems = [
    {
      title: "General",
      items: [
        {
          Icon: LayoutDashboard,
          label: "Dashboard",
          href: ROUTES.DASHBOARD,
        },
      ],
    },
    {
      title: "Products",
      items: [
        {
          Icon: Package,
          label: "Products",
          href: ROUTES.PRODUCTS,
        },
      ],
    },
    {
      title: "Website",
      items: [
        {
          Icon: Building2,
          label: "Company",
          href: ROUTES.DASHBOARD_COMPANY,
        },
        {
          Icon: AirVent,
          label: "Portfolio",
          href: ROUTES.DASHBOARD_PROJECT,
        },
        {
          Icon: BookOpen,
          label: "Articles",
          href: ROUTES.DASHBOARD_ARTICLE,
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          Icon: Users,
          label: "Users",
          href: ROUTES.USERS,
        },
        {
          Icon: Settings2,
          label: "Settings",
          href: ROUTES.DASHBOARD_SETTING,
        },
      ],
    },
    {
      title: "Chatbot",
      items: [
        {
          Icon: BotMessageSquare,
          label: "Chatbot",
          href: ROUTES.DASHBOARD_CHATBOT,
        },
        {
          Icon: MessageCircle,
          label: "Shortcut",
          href: ROUTES.DASHBOARD_CHATBOT_SHORTCUT,
        },
      ],
    },
  ];

  const router = useRouter();
  const { removeToken } = useAuthToken();

  const handleLogout = () => {
    removeToken();
    router.push(ROUTES.HOME);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size={"lg"}>
              <div className="aspect-square size-8 flex items-center justify-center bg-sidebar-primary text-sidebar-primary-foreground rounded-lg">
                <Building2 />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="truncate font-medium">ACSA</span>
                <span className="truncate text-xs">Dashboard</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navItems.map((item, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              {item.items.map((subItem, index) => (
                <SidebarMenu key={index}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => router.push(subItem.href)}
                    >
                      <subItem.Icon />
                      {subItem.label}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button variant={"destructive"} onClick={handleLogout}>
                <LogOut /> Logout
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
