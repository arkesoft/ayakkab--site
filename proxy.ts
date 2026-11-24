import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

/**
 * Dil öneki olmayan her isteği varsayılan dile yönlendirir.
 * /koleksiyon -> /tr/koleksiyon, / -> /tr
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const active = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (active) {
    // 404 sayfası hangi dilde olduğunu bu başlıktan okuyor.
    const headers = new Headers(request.headers);
    headers.set("x-locale", active);
    return NextResponse.next({ request: { headers } });
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|images|favicon|robots.txt|sitemap.xml|.*\\..*).*)"],
};
