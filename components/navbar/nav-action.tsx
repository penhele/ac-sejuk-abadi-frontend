import { Search, SearchIcon, ShoppingCart, User } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Input } from "../ui/input";
import Link from "next/link";

export default function NavAction() {
  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="flex flex-row gap-4 items-center">
        <ButtonGroup>
          <Input placeholder="Search..." />
          <Button variant="outline" aria-label="Search">
            <SearchIcon />
          </Button>
        </ButtonGroup>

        <ShoppingCart size={16} />

        <User size={16} />
      </div>

      <div className="flex flex-row gap-2 items-center">
        <Button variant={"ghost"}>Register</Button>

        <Link href={'/auth/login'}>
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
}
