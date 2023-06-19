import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/entries/")) {
    const id = req.nextUrl.pathname.replace("/api/entries/", "");
    const checkMongoIDRegExp = new RegExp("^[A-Za-z0-9_-]{21}[AQgw]$");
    if (checkMongoIDRegExp.test(id)) {
      const url = req.nextUrl.clone();
      url.search = `?message=${id} is not a valid MongoID`;
      url.pathname = "/api/bad-request";

      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn mores
export const config = {
  matcher: [
    // "/api/:path",
    "/api/entries/:path/",
  ],
};
