import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { betterFetch } from "@better-fetch/fetch";

// Routes that don't require authentication
const authRoutes = ["/auth/login", "/auth/register"];
// Routes that require authentication
const protectedRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const { nextUrl, headers } = request;
  const pathName = request.nextUrl.pathname;

  const isAuthRoute = authRoutes.includes(pathName);
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathName.startsWith(route),
  );
  const cookies = headers.get("cookie");

  // Quick check for session cookie existence
  const sessionCookie = getSessionCookie(request);

  // For protected routes, we need to verify the session
  if (isProtectedRoute) {
    if (!sessionCookie) {
      // No session cookie, redirect to login
      let callbackUrl = nextUrl.pathname;
      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }
      const encodedCallbackUrl = encodeURIComponent(callbackUrl);
      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, request.url),
      );
    }

    try {
      await betterFetch("/api/auth/get-session", {
        baseURL: process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin,
        query: {
          disableCookieCache: true,
        },
        headers: {
          cookie: cookies || "",
        },
      });
    } catch (error) {
      // Error fetching session, redirect to login
      return NextResponse.redirect(
        new URL(`/auth/login?error=Authentication%20error`, request.url),
      );
    }
  }

  // For auth routes, redirect to dashboard if already authenticated
  if (isAuthRoute && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow root access without redirection
  if (pathName === "/") {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
