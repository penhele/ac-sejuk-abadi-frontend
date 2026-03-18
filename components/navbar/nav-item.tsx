import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function NavItem() {
  const menuItems: { label: string; href: string }[] = [
    { label: "Beranda", href: "/" },
    { label: "Toko", href: "/shop" },
    { label: "Portofolio", href: "/portofolio" },
    { label: "Edukasi", href: "/education" },
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
