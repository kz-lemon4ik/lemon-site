import type { Language } from "@/lib/i18n";

const US_ZONE = /^(America\/(New_York|Detroit|Chicago|Denver|Phoenix|Los_Angeles|Anchorage|Juneau|Sitka|Metlakatla|Yakutat|Nome|Adak|Boise|Menominee|Indiana\/.+|Kentucky\/.+|North_Dakota\/.+)|Pacific\/Honolulu)$/;

function inUnitedStates(): boolean {
  try {
    return US_ZONE.test(Intl.DateTimeFormat().resolvedOptions().timeZone);
  } catch {
    return false;
  }
}

const ENGLISH_FLAG = inUnitedStates() ? "us" : "gb";

export function flagOf(language: Language): string {
  return language.id === "en" ? ENGLISH_FLAG : language.flag;
}
