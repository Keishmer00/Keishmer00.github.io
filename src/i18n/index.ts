import en from "./en.json";
import es from "./es.json";

export type Lang = "en" | "es";
export type TranslationValue = string | string[] | Record<string, unknown>;
export type TranslationMap = Record<string, TranslationValue>;

const translations: Record<Lang, TranslationMap> = { en, es };

export function useTranslations(lang: Lang) {
  const dict = translations[lang];

  function t(key: string): string {
    const keys = key.split(".");
    let value: TranslationValue | undefined = dict;
    for (const k of keys) {
      if (typeof value === "object" && value !== null && k in value) {
        value = (value as Record<string, TranslationValue>)[k];
      } else {
        return key;
      }
    }
    return typeof value === "string" ? value : key;
  }

  function tArray(key: string): string[] {
    const keys = key.split(".");
    let value: TranslationValue | undefined = dict;
    for (const k of keys) {
      if (typeof value === "object" && value !== null && k in value) {
        value = (value as Record<string, TranslationValue>)[k];
      } else {
        return [];
      }
    }
    return Array.isArray(value) ? (value as string[]) : [];
  }

  return { t, tArray, lang, alternateLang: lang === "en" ? "es" : "en" };
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang === "es") return "es";
  return "en";
}

export function getLocalizedPath(path: string, lang: Lang): string {
  if (lang === "en") return path;
  const cleanPath = path.replace(/^\//, "");
  return `/es/${cleanPath}`;
}

export function getAlternatePaths(pathname: string): { en: string; es: string } {
  const isSpanish = pathname.startsWith("/es/") || pathname === "/es";
  if (isSpanish) {
    const enPath = pathname.replace(/^\/es(\/|$)/, "/");
    return { en: enPath || "/", es: pathname || "/es/" };
  }
  return { en: pathname || "/", es: `/es${pathname === "/" ? "" : pathname}` };
}
