import { NextRequest, NextResponse } from "next/server";

function getRoleFromToken(token: string) {
  const base64Url = token.split(".")[1];
  if (!base64Url) return null;

  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  while (base64.length % 4) {
    base64 += "=";
  }

  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join(""),
  );
  const payload = JSON.parse(jsonPayload);

  return payload?.role;
}

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const role = getRoleFromToken(token);

    if (!role || role.toLowerCase() !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
