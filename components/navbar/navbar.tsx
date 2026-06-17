"use client";

import Image from "next/image";
import Link from "next/link";
import NavItem from "./nav-item";
import { Toggle } from "../ui/toggle";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { ROUTES } from "@/constants/routes";
import { useCompany } from "@/features/company/hooks/use-company";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { data: company } = useCompany();

  return (
<<<<<<< HEAD
    <div className="sticky top-0 z-50 bg-white dark:bg-background h-16">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between">
        <div className="flex lg:flex-row flex-col lg:justify-between items-center py-2">
          <div className="flex w-full lg:w-fit xs:justify-between justify-center flex-row gap-16 items-center ">
            <Link href={ROUTES.HOME} className="relative h-12 w-28">
              {company?.logo_url ? (
                <Image
                  src={company?.logo_url}
                  alt="logo-company"
                  fill
                  className="object-contain"
                />
              ) : (
                <span>logo</span>
              )}
=======
    <div className="sticky top-0 z-50 bg-white h-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex lg:flex-row flex-col lg:justify-between items-center px-page-inline xl:px-0 py-2">
          <div className="flex w-full lg:w-fit xs:justify-between justify-center flex-row gap-16 items-center ">
            <Link href={"/"} className="relative h-12 min-w-28">
              <Image
                src="/logo.png"
                alt="logo"
                fill
                className="object-contain"
              />
>>>>>>> a48fc63b33cef8bb70f3e7dd456e65181a42407b
            </Link>

            <div className="hidden xs:block">
              <NavItem />
            </div>
          </div>
        </div>

        <Toggle
          pressed={theme === "dark"}
          onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "light" ? <Sun /> : <Moon />}
          {theme}
        </Toggle>
      </div>
    </div>
  );
}
