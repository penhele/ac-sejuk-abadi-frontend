import Link from "next/link";
import { Separator } from "../ui/separator";

export default function FooterBottom() {
  return (
    <div className="space-y-between-items">
      <Separator />

      <div className="text-xs flex flex-col md:flex-row justify-between font-medium space-y-2">
        <p className="w-full">
          © 2026 PT. Alfa Cakrawala Sejuk Abadi. All rights reserved.
        </p>

        <div className="flex w-full justify-start md:justify-end gap-8">
          <Link href="/privacy" className="hover: transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover: transition-colors">
            Terms of Service
          </Link>
          <Link href="/cookie-policy" className="hover: transition-colors">
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
