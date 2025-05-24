import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware({
  // A list of all locales that are supported
  locales: routing.locales,
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: routing.defaultLocale,
  // Use the prefixed path to determine locale only when needed
  localePrefix: "as-needed",
  // Always redirect to the default locale
  localeDetection: true,
});

export const config = {
  // Match all pathnames except for
  // - api routes
  // - static files (e.g. /favicon.ico, /images/...)
  // - files in the public folder
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
