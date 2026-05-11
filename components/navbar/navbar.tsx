import Image from "next/image";
import Link from "next/link";
import NavItem from "./nav-item";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-white h-16">
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
        </div>
      </div>
    </div>
  );
}
