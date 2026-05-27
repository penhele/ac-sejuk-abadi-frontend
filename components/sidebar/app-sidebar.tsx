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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/constants/routes";
import {
  AirVent,
  Building2,
  ChevronRight,
  Cuboid,
  Layers2,
  Monitor,
  Moon,
  Package,
  Sun,
} from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export function AppSidebar() {
  const navProduct = [
    {
      title: "Products",
      items: [
        {
          Icon: Package,
          label: "Product",
          href: ROUTES.PRODUCTS,
          isActive: false,
          items: [
            { label: "Product", href: ROUTES.PRODUCTS },
            { label: "Image", href: "#" },
          ],
        },
        { Icon: Cuboid, label: "Brand", href: ROUTES.BRAND },
        { Icon: Layers2, label: "Category & Type", href: ROUTES.CATEGORY_TYPE },
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
      ],
    },
  ];

  const { theme, setTheme, themes } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Sidebar variant="floating">
      <SidebarHeader />
      <SidebarContent>
        {navProduct.map((group, groupIdx) => (
          <SidebarGroup key={groupIdx}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((subItem, subIdx) => {
                const hasChildren =
                  "items" in subItem &&
                  Array.isArray(subItem.items) &&
                  subItem.items.length > 0;

                // JIKA MEMILIKI SUB-MENU (Menggunakan Collapsible)
                if (hasChildren) {
                  return (
                    <Collapsible
                      key={subIdx}
                      asChild
                      defaultOpen={subItem.isActive}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={subItem.label}>
                            <subItem.Icon />
                            <span>{subItem.label}</span>
                            <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {subItem.items?.map((subSubItem, childIdx) => (
                              <SidebarMenuSubItem key={childIdx}>
                                <SidebarMenuSubButton asChild>
                                  <Link href={subSubItem.href}>
                                    <span>{subSubItem.label}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                // JIKA MENU BIASA (Tanpa Sub-menu)
                return (
                  <SidebarMenuItem key={subIdx}>
                    <SidebarMenuButton asChild tooltip={subItem.label}>
                      <Link href={subItem.href}>
                        <subItem.Icon />
                        <span>{subItem.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
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
