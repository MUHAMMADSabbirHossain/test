import { NextRequest, NextResponse } from "next/server";

// Define routes that require authentication
const protectedRoutes = ["/dashboard", "/cart"];

// Define public routes that do not require authentication
const publicRoutes = ["/", "/login", "/register"];

export async function middleware(request: NextRequest) {
  console.log(`Middleware running for: ${request.nextUrl.pathname}`);

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Check if the current route is public
  const isPublicRoute = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // If it's a protected route
  if (isProtectedRoute) {
    // Try to get the auth_token cookie from the request
    const authToken = request.cookies.get("auth_token");
    console.log(`Auth token found: ${!!authToken}`);

    // If the cookie is not present, redirect to the login page (or wherever appropriate)
    if (!authToken) {
      console.log("No auth token found, redirecting to login.");
      // You might want to preserve the original URL for redirect after login
      const requestedUrl = request.nextUrl.pathname + request.nextUrl.search;
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("returnTo", requestedUrl);
      console.log({ requestedUrl }, { loginUrl });

      return NextResponse.redirect(
        new URL(`/auth/login?returnTo=${requestedUrl}`, request.url)
      );
    }

    console.log("Auth token found and route is protected, allowing access.");
    return NextResponse.next(); // Allow the request to proceed
  }

  if (isPublicRoute) {
    console.log("Public route, allowing access.");
    return NextResponse.next();
  }

  console.log(
    "Route not explicitly protected or public, allowing access by default."
  );
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    // Explicitly include the routes you want to protect if the above pattern misses them
    // "/dashboard/:path*",
  ],
};
