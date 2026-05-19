import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default function NavItem() {
  const menuItems: { label: string; href: string }[] = [
    { label: "Beranda", href: ROUTES.HOME },
    { label: "Toko", href: ROUTES.SHOP },
    { label: "Portofolio", href: ROUTES.PORTOFOLIO },
    { label: "Edukasi", href: ROUTES.EDUCATION },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menuItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={item.href}>{item.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
