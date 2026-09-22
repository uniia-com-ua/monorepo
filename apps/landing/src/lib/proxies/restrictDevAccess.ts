import { notFound } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";
import { isDevelopment } from "../helpers";

// restrict urls with /dev (and localized like /LOCALE/dev) prefix to development environment only
// if not in development, throw a 404 error

export default function restrictDevAccess(
  req: NextRequest,
): NextResponse | null {
  const url = req.nextUrl;
  if (
    url.pathname.startsWith("/dev") ||
    url.pathname.match(/^\/[a-z]{2}(-[A-Z]{2})?\/dev/)
  ) {
    if (!isDevelopment()) {
      return notFound();
    }
  }

  return null;
}
