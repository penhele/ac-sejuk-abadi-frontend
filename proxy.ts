import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const role = request.cookies.get("role")?.value;

  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");

  // belum login
  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // bukan admin
  if (isDashboardRoute && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
