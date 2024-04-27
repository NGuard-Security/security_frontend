/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from "next/server"

const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  if (req.nextUrl.locale === "default") {
    // Please change `ko` in here if you want to modify the default locale.
    const locale = req.cookies.get("NEXT_LOCALE")?.value || "ko"

    const redirectUrl = new URL(
      `/${locale}${pathname}${search}`,
      req.url,
    )
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}
