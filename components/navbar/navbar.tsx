"use client";

import Image from "next/image";
import Link from "next/link";
import NavItem, { menuItems } from "./nav-item";
import { Toggle } from "../ui/toggle";
import { Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { ROUTES } from "@/constants/routes";
import { useCompany } from "@/features/company/hooks/use-company";
import { useMe } from "@/features/auth/hooks/use-me";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import { useIsAdmin, useAuthToken } from "@/features/auth/hooks";

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2.5"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

export function MenuToggle({
  toggle,
  isOpen,
}: {
  toggle: () => void;
  isOpen: boolean;
}) {
  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted dark:hover:bg-muted/80 text-foreground transition-colors focus:outline-none shrink-0 cursor-pointer"
      aria-label="Toggle Menu"
    >
      <svg width="20" height="20" viewBox="0 0 20 20">
        <Path
          variants={{
            closed: { d: "M 2 4.5 L 18 4.5" },
            open: { d: "M 3 17 L 17 3" },
          }}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <Path
          d="M 2 10 L 18 10"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.2 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 15.5 L 18 15.5" },
            open: { d: "M 3 3 L 17 17" },
          }}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </button>
  );
}

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { data: company, isLoading } = useCompany();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { isAdmin } = useIsAdmin();
  const { isAuthenticated } = useAuthToken();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = useIsMobile();

  // Close mobile menu on resize to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const getInitials = (name?: string) => {
    if (!name) return "SA";
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <>
      <div className="sticky top-0 z-50 w-full bg-white dark:bg-background">
        {/* Standard Rectangular Header */}
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
          {/* Logo / Company Name */}
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-3 shrink-0 group"
          >
            {isLoading ? (
              <div className="h-10 w-10 rounded-xl bg-zinc-200 dark:bg-zinc-800 animate-pulse shrink-0" />
            ) : company?.logo_url ? (
              <div className="relative h-10 w-10 shrink-0">
                <Image
                  src={company.logo_url}
                  alt="logo-company"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="h-10 w-10 rounded-xl bg-linear-to-br from-primary to-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm shrink-0">
                {getInitials(company?.name)}
              </div>
            )}

            {mounted && (
              <span className="font-bold text-base tracking-tight text-foreground hidden sm:inline-block group-hover:text-primary transition-colors">
                {isLoading ? (
                  <span className="inline-block h-4 w-28 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded" />
                ) : (
                  company?.name || "Sejuk Abadi"
                )}
              </span>
            )}
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden sm:block">
            <NavItem />
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2">
            {mounted && isAuthenticated() && (
              <div className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted text-foreground transition-colors cursor-pointer shrink-0">
                <User className="h-5 w-5" />
              </div>
            )}

            {mounted && (
              <Toggle
                pressed={theme === "dark"}
                className="rounded-full w-10 h-10 p-0 hover:bg-muted shrink-0 cursor-pointer"
                onPressedChange={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
              >
                {theme === "light" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Toggle>
            )}

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <MenuToggle toggle={toggleMenu} isOpen={isOpen} />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-xs sm:hidden"
              />

              {/* Floating Menu Card */}
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-18 left-0 right-0 z-50 bg-white/95 dark:bg-zinc-950/95 border border-border backdrop-blur-md rounded-2xl p-5 shadow-xl flex flex-col gap-4 sm:hidden mx-4"
              >
                <div className="flex flex-col gap-2">
                  {menuItems.map(
                    (item: { label: string; href: string }, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center w-full px-4 py-3 rounded-xl hover:bg-muted font-medium text-foreground transition-colors"
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ),
                  )}
                  {isAdmin && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: menuItems.length * 0.05 + 0.1 }}
                    >
                      <Link
                        href={ROUTES.DASHBOARD}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center w-full px-4 py-3 rounded-xl hover:bg-muted font-medium text-foreground transition-colors"
                      >
                        Dashboard
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
