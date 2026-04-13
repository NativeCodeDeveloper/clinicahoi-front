//NUEVOS ACCESOS

import { clerkClient, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getRoleFromSessionClaims, getRoleFromUser, hasRouteAccess } from "@/lib/permissions";

const isDashboard = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isDashboard(req)) return NextResponse.next();

  const { userId, sessionClaims } = await auth();

  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  let role = getRoleFromSessionClaims(sessionClaims);

  if (role === "none") {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    role = getRoleFromUser(user);
  }

  if (!hasRouteAccess(role, req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard/no-access", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
