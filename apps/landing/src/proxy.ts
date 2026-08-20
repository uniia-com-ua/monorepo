import createMiddleware from "next-intl/middleware";
import type { NextRequest, NextResponse } from "next/server";
import { routing } from "./lib/i18n/routing";
import httpsRedirect from "./lib/proxies/httpsRedirect";

const intlProxy = createMiddleware(routing);

const proxies: ((
  req: NextRequest,
) => NextResponse | null | Promise<NextResponse | null>)[] = [httpsRedirect]; // for future use, if we want to add more proxies

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
    "/((?!_next|_vercel|api|robots.txt|favicon.ico|sitemap|.*\\..*).*)",
  ],
};
