/**
 * App Store Connect metadata languages (50).
 * @see https://developer.apple.com/documentation/appstoreconnectapi/managing-metadata-in-your-app-by-using-locale-shortcodes
 */
export const APP_STORE_LOCALES = [
  "ar-SA",
  "bn-BD",
  "ca",
  "zh-Hans",
  "zh-Hant",
  "hr",
  "cs",
  "da",
  "nl-NL",
  "en-AU",
  "en-CA",
  "en-GB",
  "en-US",
  "fi",
  "fr-FR",
  "fr-CA",
  "de-DE",
  "el",
  "gu-IN",
  "he",
  "hi",
  "hu",
  "id",
  "it",
  "ja",
  "kn-IN",
  "ko",
  "ms",
  "ml-IN",
  "mr-IN",
  "no",
  "or-IN",
  "pl",
  "pt-BR",
  "pt-PT",
  "pa-IN",
  "ro",
  "ru",
  "sk",
  "sl-SI",
  "es-MX",
  "es-ES",
  "sv",
  "ta-IN",
  "te-IN",
  "th",
  "tr",
  "uk",
  "ur-PK",
  "vi",
] as const;

export type AppStoreLocale = (typeof APP_STORE_LOCALES)[number];

/**
 * Build a per-locale copy map. Every storefront gets `en` by default;
 * pass overrides for languages you have translated.
 */
export function L(
  en: string,
  overrides: Partial<Record<AppStoreLocale, string>> = {},
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const locale of APP_STORE_LOCALES) {
    out[locale] = overrides[locale] ?? en;
  }
  return out;
}
