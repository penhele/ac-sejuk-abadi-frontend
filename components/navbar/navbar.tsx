import Image from "next/image";
import NavAction from "./nav-action";
import NavItem from "./nav-item";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex lg:flex-row flex-col lg:justify-between items-center py-2">
          <div className="flex w-full lg:w-fit xs:justify-between justify-center flex-row gap-16 items-center ">
            <Link href={"/"} className="relative h-12 w-28">
              <Image
                src="/logo.png"
                alt="logo"
                fill
                className="object-contain"
              />
            </Link>

            <div className="hidden xs:block">
              <NavItem />
            </div>
          </div>

          <NavAction />
        </div>
      </div>
    </div>
  );
}
