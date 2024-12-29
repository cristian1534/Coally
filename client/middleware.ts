import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/")) {
    if (!token) {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }

   return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};

