import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "./lib/i18n/dictionaries";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Next.js static files shouldn't be touched
  const isStaticAsset =
    pathname.includes(".") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/");
  if (isStaticAsset) return;

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale: string) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  // 1. Check for cookie
  const savedLocale = request.cookies.get("app_lang")?.value;

  let localeToUse = defaultLocale;

  if (savedLocale && (locales as any as string[]).includes(savedLocale)) {
    localeToUse = savedLocale as any;
  } else {
    // 2. Check header
    const acceptLang = request.headers.get("accept-language");
    if (acceptLang?.includes("bg")) {
      localeToUse = "bg";
    }
  }

  request.nextUrl.pathname = `/${localeToUse}${pathname}`;

  // return Response.redirect(request.nextUrl)
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    // Skip all statics (contains dot)
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};
