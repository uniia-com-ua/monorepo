import { type NextRequest, NextResponse } from "next/server";
import { isDevelopment } from "../helpers";

export default function httpsRedirect(req: NextRequest): NextResponse | null {
  const xForwardedProto = req.headers.get("x-forwarded-proto");
  const host = req.headers.get("host") ?? "";
  const isDev = isDevelopment() || host.includes("localhost");

  if (
    !isDev &&
    (xForwardedProto === null || !xForwardedProto.includes("https"))
  ) {
    return NextResponse.redirect(
      `https://${host}${req.nextUrl.pathname}${req.nextUrl.search}`,
      301,
    );
  }
  return null;
}
