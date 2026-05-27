"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
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

export function AppSidebar() {
  const navMain = [
    {
      title: "Products",
      href: "#",
      Icon: Package,
      isActive: true,
      items: [
        { label: "Product", href: ROUTES.PRODUCTS },
        {
          label: "Brand",
          href: ROUTES.BRAND,
        },
        {
          label: "Category & Type",
          href: ROUTES.CATEGORY_TYPE,
        },
      ],
    },
  ];

  const navCompany = [
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
          href: ROUTES.DASHBOARD_PORTOFOLIO,
        },
      ],
    },
  ];

  const { theme, setTheme, themes } = useTheme();

  return (
    <Sidebar variant="floating">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Shop</SidebarGroupLabel>

          <SidebarMenu>
            {navMain.map((item, index) => (
              <Collapsible
                key={index}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild>
                      <Link href={item.href}>
                        <item.Icon />
                        {item.title}
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </Link>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.label}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.href}>
                              <span>{subItem.label}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {navCompany.map((item, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>

            <SidebarMenu>
              {item.items.map((subItem, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link href={subItem.href}>
                      <subItem.Icon />
                      {subItem.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
                  {theme === themes[0] && <Sun />}
                  {theme === themes[1] && <Moon />}
                  {theme === themes[2] && <Monitor />}

                  {theme}
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
