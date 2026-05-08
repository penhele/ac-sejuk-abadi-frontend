"use client";

import { Languages, SearchIcon, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ROUTES } from "@/contants/routes";

export default function NavAction() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("access_token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="flex flex-row gap-4 items-center">
        <Button variant={"outline"} className="space-x-1 flex items-center">
          <Languages size={16} />
          <span>EN</span>
        </Button>

        <ButtonGroup className="xs:flex hidden">
          <Input placeholder="Search..." />
          <Button variant="outline" aria-label="Search">
            <SearchIcon />
          </Button>
        </ButtonGroup>

        <SearchIcon size={16} className="block xs:hidden" />

        <Link href={"/cart"}>
          <ShoppingCart size={16} />
        </Link>

        {isLoggedIn && (
          <Link href={"/account"}>
            <User size={16} />
          </Link>
        )}
      </div>

      <div className="flex flex-row gap-2 items-center">
        {!isLoggedIn && (
          <>
            <Link href={ROUTES.REGISTER}>
              <Button variant={"ghost"}>Register</Button>
            </Link>

            <Link href={ROUTES.LOGIN}>
              <Button>Login</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
