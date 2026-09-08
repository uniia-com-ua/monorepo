import createMiddleware from "next-intl/middleware";
import type { NextRequest, NextResponse } from "next/server";
import { routing } from "./lib/i18n/routing";
import httpsRedirect from "./lib/proxies/httpsRedirect";
import restrictDevAccess from "./lib/proxies/restrictDevAccess";

const intlProxy = createMiddleware(routing);

const proxies: ((
  req: NextRequest,
) => NextResponse | null | Promise<NextResponse | null>)[] = [
  // httpsRedirect // @note: Disabled for now, see: https://t.me/c/3749132802/2/1854
  restrictDevAccess,
]; // for future use, if we want to add more proxies

export default async function proxy(req: NextRequest) {
  let response: NextResponse | null = null;

  for (const proxy of proxies) {
    response = await proxy(req);
    if (response) {
      break;
    }
  }

  response ??= intlProxy(req);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/",
    "/sitemap.xml",
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    "/([\\w-]+)?/dev/components/(.+)",
  ],
};
