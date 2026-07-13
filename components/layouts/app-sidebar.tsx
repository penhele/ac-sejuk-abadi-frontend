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
import {
  AirVent,
  BookOpen,
  Building2,
  LayoutDashboard,
  LogOut,
  Monitor,
  Moon,
  Package,
  Settings2,
  Sun,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useAuthToken } from "@/features/auth/hooks";

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
  ];

  const { theme, setTheme, themes } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();
  const { removeToken } = useAuthToken();

  const handleLogout = () => {
    removeToken();
    router.push(ROUTES.HOME);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {/* 3. Wrap theme checking with the mounted condition */}
                  {mounted && theme === themes[0] && <Sun />}
                  {mounted && theme === themes[1] && <Moon />}
                  {mounted && theme === themes[2] && <Monitor />}

                  {/* Optional: Render placeholder text or nothing until mounted */}
                  {mounted ? theme : "Loading theme..."}
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>

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
