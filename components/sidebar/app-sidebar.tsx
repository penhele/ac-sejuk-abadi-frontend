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
  Building2,
  LayoutDashboard,
  Monitor,
  Moon,
  Package,
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

export function AppSidebar() {
  const navProduct = [
    {
      title: "Products",
      items: [
        { Icon: LayoutDashboard, label: "Dashboard", href: ROUTES.DASHBOARD },
        { Icon: Package, label: "Product", href: ROUTES.PRODUCTS },
      ],
    },
    {
      title: "Company",
      items: [
        {
          Icon: Building2,
          label: "Company",
          href: ROUTES.DASHBOARD_COMPANY,
        },
        {
          Icon: AirVent,
          label: "Portofolio",
          href: ROUTES.DASHBOARD_PROJECT,
        },
        {
          Icon: Users,
          label: "Users",
          href: ROUTES.USERS,
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

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        {navProduct.map((item, index) => (
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
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
