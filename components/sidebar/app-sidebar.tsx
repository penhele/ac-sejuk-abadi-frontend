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
import { AirVent, Building2, ChevronRight, Package } from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

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
      <SidebarFooter />
    </Sidebar>
  );
}
