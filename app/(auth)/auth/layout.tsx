import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={geist.className}>
      <body>{children}</body>
    </html>
  );
}
