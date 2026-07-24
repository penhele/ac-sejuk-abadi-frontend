"use client";

import { useMe } from "@/features/auth/hooks/use-me";
import { useCompany } from "@/features/company/hooks/use-company";
import { LogOut, Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";

export default function Header() {
  const { data: me } = useMe();

  const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const getInitials = (name: string): string => {
    const words = name.trim().split(/\s+/).filter(Boolean);

    if (words.length === 0) return "";

    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }

    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  };

  return (
    <div className="border-b sticky top-0 p-4 backdrop-blur-lg z-30 flex flex-row bg-background/80">
      <SidebarTrigger />

      <div className="flex flex-row items-center space-x-4 ml-auto">
        <Button size={"icon-xs"} variant={"ghost"} onClick={handleTheme}>
          {theme === "light" ? <Sun /> : <Moon />}
        </Button>

        <Separator orientation="vertical" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} size={"icon-xs"} className="text-2xs">
              {getInitials(`${me?.first_name} ${me?.last_name}`)}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-3xs">
            <DropdownMenuGroup>
              <div className="px-2 py-1.5 flex flex-col">
                <span className="text-sm">{me?.first_name}</span>
                <span className="text-xs text-muted-foreground">
                  {me?.email}
                </span>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Settings /> Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem variant="destructive">
                <LogOut /> Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
