/** Matches spatie/laravel-translatable JSON column format */
export interface Localizable {
  en: string;
  zh: string;
}

export type Lang = "en" | "zh";

/** Extract the current language string from a Localizable object */
export function localize(obj: Localizable, lang: Lang): string {
  return obj[lang] || obj.en;
}
