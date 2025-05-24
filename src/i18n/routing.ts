import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "vi"],

  // Used when no locale matches
  defaultLocale: "en",

  // This option is not needed when using the middleware
  // but helps to improve type safety with a prefix
  localePrefix: "as-needed",
});
