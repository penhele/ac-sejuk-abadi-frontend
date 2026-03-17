import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="p-4 lg:p-0">{children}</div>;
}
