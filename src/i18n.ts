import { getRequestConfig } from "next-intl/server";

// Re-export locales and defaultLocale from routing
import { routing } from "./i18n/routing";

export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;
export type Locale = (typeof locales)[number];

// The rest of this file is kept for backward compatibility
// New code should use the i18n/request.ts file instead
export default getRequestConfig(async ({ requestLocale }) => {
  // Fallback in case requestLocale is not available
  const locale = (await requestLocale) || defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
