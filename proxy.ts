import { NextRequest, NextResponse } from "next/server";
import { ROUTES } from "./contants/routes";

const PROTECTED_ROUTES = [
  ROUTES.WISHLIST,
  ROUTES.CART,
  ROUTES.PAYMENT,
  ROUTES.ACCOUNT,
];
const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER];
const ADMIN_ROUTES = ["/dashboard"];

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const role = request.cookies.get("user_role")?.value;

  const { pathname } = request.nextUrl;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));

  if (!token && (isProtectedRoute || isAdminRoute)) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  if (token && role !== "admin" && isAdminRoute) {
    // Arahkan ke halaman utama atau halaman "403 Forbidden"
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Cocokkan semua request rute kecuali:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
