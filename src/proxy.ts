import { type NextRequest, NextResponse } from "next/server";

/**
 * Next.js 16 Proxy (replaces middleware).
 * TODO: Replace with Supabase Auth session check when backend is integrated.
 *
 * Since auth is currently localStorage-based (client-only), this proxy
 * only handles route structure. Real auth checks happen in (app)/layout.tsx.
 * When Supabase is added, this will verify the session cookie server-side.
 */

const publicRoutes = ["/login"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes and static assets
  if (
    publicRoutes.some((route) => pathname.startsWith(route)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // TODO: When Supabase is integrated, check session cookie here:
  // const supabase = createServerClient(...)
  // const { data: { session } } = await supabase.auth.getSession()
  // if (!session) return NextResponse.redirect(new URL('/login', request.url))

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
