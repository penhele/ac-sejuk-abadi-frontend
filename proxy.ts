import { NextRequest, NextResponse } from "next/server";

function getRoleFromToken(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    // atob is available in Edge Runtime
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    const payload = JSON.parse(jsonPayload);

    console.log("payload:", payload);

    return payload?.role; // Sesuai dengan enum UserRole dari Prisma backend Anda: ADMIN, TEACHER, STUDENT
  } catch (e) {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  // Jika mencoba mengakses rute dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      // Tidak ada token (belum login) -> redirect ke /login
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const role = getRoleFromToken(token);

    // Cek jika role bukan admin (case-insensitive)
    if (!role || role.toLowerCase() !== "admin") {
      // Login tapi bukan admin -> redirect ke halaman utama
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Jika sudah login dan mencoba mengakses halaman auth (login/register)
  if (
    (pathname.startsWith("/login") || pathname.startsWith("/register")) &&
    token
  ) {
    const role = getRoleFromToken(token);
    if (role && role.toLowerCase() === "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
