import { decrypt } from "./lib/session";
import { NextRequest, NextResponse } from "next/server";

// --- 2. THE PROXY LOGIC (Routing/Filtering) ---
export default async function proxy(request: NextRequest) {
  const cookie = request.cookies.get("session")?.value;
  const session = await decrypt(cookie);

  const { pathname } = request.nextUrl;

  // Protect the Dashboard (Home)
  if (!session && pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Prevent authed users from seeing Login/Register again
  if (session && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
