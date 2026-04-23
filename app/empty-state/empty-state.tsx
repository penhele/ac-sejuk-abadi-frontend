import { Button } from "@/components/ui/button";
import { Cuboid } from "lucide-react";
import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="space-y-2 flex flex-col items-center">
      <Cuboid size={64} className="text-gray-600" />

      <div className="space-y-1 flex flex-col items-center">
        <span className="text-lg text-gray-600 font-semibold">
          No wishlist yet
        </span>
        <span className="text-sm text-gray-400">
          You haven’t added any HVAC products to your wishlist. Start exploring
          and save your favorites here.
        </span>
      </div>

      <Link href={"/shop"}>
        <Button>Browse Products</Button>
      </Link>
    </div>
  );
}
