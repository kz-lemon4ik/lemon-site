import { useMemo } from "react";
import enDict from "@/locales/en.json";
import { useLang, type Dict } from "@/lib/i18n";

const STEPS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 24 * 3600],
  ["month", 30 * 24 * 3600],
  ["week", 7 * 24 * 3600],
  ["day", 24 * 3600],
  ["hour", 3600],
  ["minute", 60],
];

export interface Format {
  whole: (value: number) => string;
  pp: (value: number) => string;
  gain: (value: number) => string;
  delta: (value: number) => string;
  tenths: (value: number) => string;
  accuracy: (value: number) => string;
  day: (value: string | number) => string;
  moment: (value: string | number) => string;
  ago: (value: string | number, now?: number) => string;
  size: (bytes: number) => string;
}

type Words = Dict["format"] & { ago?: Partial<Record<string, string>> };

function formatter(locale: string, words: Words): Format {
  const whole = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  const tenths = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const hundredths = new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const relative = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const clock = new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" });
  const months = words.months.length === 12 ? words.months : enDict.format.months;
  return {
    whole: (value) => whole.format(value),
    pp: (value) => `${whole.format(value)} pp`,
    gain: (value) => `+${tenths.format(Math.abs(value))} pp`,
    delta: (value) => `+${tenths.format(Math.abs(value))}`,
    tenths: (value) => tenths.format(value),
    accuracy: (value) => `${hundredths.format(value)}%`,
    day: (value) => {
      const date = new Date(value);
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    },
    moment: (value) => {
      const date = new Date(value);
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}, ${clock.format(date)}`;
    },
    ago: (value, now = Date.now()) => {
      const seconds = (new Date(value).getTime() - now) / 1000;
      for (const [unit, size] of STEPS) {
        if (Math.abs(seconds) >= size) {
          const count = Math.round(seconds / size);
          const own = count < 0 ? (count === -1 ? words.ago?.[`${unit}1`] : undefined) ?? words.ago?.[unit] : undefined;
          return own ? own.replace("{{count}}", whole.format(-count)) : relative.format(count, unit);
        }
      }
      return words.justNow;
    },
    size: (bytes) => `${tenths.format(bytes / (1024 * 1024))} ${words.mb}`,
  };
}

export function useFormat(): Format {
  const { language, dict } = useLang();
  return useMemo(() => formatter(language.numbers ?? language.locale, { ...enDict.format, ...dict.format }), [language, dict]);
}
