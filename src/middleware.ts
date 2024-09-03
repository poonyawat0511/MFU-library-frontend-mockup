import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Retrieve the access token from cookies
  const accessToken = request.cookies.get("access_token");

  // Define public paths that do not require authentication
  const publicPaths = ["/auth/login", "/auth/register", "/public"];

  // Check if the request is for a public path
  if (publicPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check if the access token exists
  if (!accessToken) {
    // Redirect to the login page if token is missing
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Optionally, validate the access token here if needed
  // For example, you can call an API to verify the token or check its validity

  // If token exists, continue with the request
  return NextResponse.next();
}

// Define middleware configuration
export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"], // Apply middleware to all paths except API routes and static assets
};