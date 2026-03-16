import Image from "next/image";
import NavAction from "./nav-action";
import NavItem from "./nav-item";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16 bg-white">
          <div className="flex flex-row gap-16">
            <Link href={"/"} className="relative h-12 w-28">
              <Image
                src="/logo.png"
                alt="logo"
                fill
                className="object-contain"
              />
            </Link>

            <NavItem />
          </div>

          <NavAction />
        </div>
      </div>
    </div>
  );
}
