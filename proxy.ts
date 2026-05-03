import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  // /admin/login is excluded from the matcher — it's always public
  // All other /admin/* routes require authentication
  if (!req.auth) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  // Match /admin and all sub-paths EXCEPT /admin/login
  matcher: ["/admin/((?!login$).+)", "/admin"],
};
