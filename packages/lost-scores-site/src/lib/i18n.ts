import { createContext, createElement, Fragment, useContext, useMemo, type ReactNode } from "react";
import en from "@/locales/en.json";
import languages from "@/locales/languages.json";

export type Dict = typeof en;

export interface Language {
  id: string;
  name: string;
  flag: string;
  locale: string;
  numbers?: string;
}

export const LANGS: Language[] = languages;
const ENGLISH = LANGS.find((language) => language.id === "en") ?? LANGS[0];

const files = import.meta.glob<{ default: Dict }>(["../locales/*.json", "!../locales/languages.json", "!../locales/en.json"]);

export function languageOf(id: string): Language {
  return LANGS.find((language) => language.id === id) ?? ENGLISH;
}

export async function loadDict(id: string): Promise<Dict> {
  const load = files[`../locales/${id}.json`];
  if (id === ENGLISH.id || !load) {
    return en;
  }
  return (await load()).default;
}

type Leaves<T, P extends string = ""> = {
  [K in keyof T & string]: T[K] extends string | readonly unknown[] ? `${P}${K}` : `${P}${K}` | Leaves<T[K], `${P}${K}.`>;
}[keyof T & string];

type Forms = "zero" | "one" | "two" | "few" | "many" | "other";

type Base<K> = K extends `${infer B}_${Forms}` ? B : K;

export type Key = Base<Leaves<Dict>>;

export type Vars = Record<string, string | number>;

export type Parts = Record<string, (text: string) => ReactNode>;

export interface Translator {
  language: Language;
  t: (key: Key, vars?: Vars) => string;
  rich: (key: Key, parts: Parts, vars?: Vars) => ReactNode;
  raw: <T>(key: Key) => T;
}

const TAG = /<(\w+)>([\s\S]*?)<\/\1>|<(\w+)\s*\/>/g;

function walk(dict: unknown, key: string): unknown {
  let node = dict;
  for (const part of key.split(".")) {
    if (node === null || typeof node !== "object") {
      return undefined;
    }
    node = (node as Record<string, unknown>)[part];
  }
  return node;
}

export function renderRich(text: string, parts: Parts): ReactNode {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(TAG)) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const render = parts[match[1] ?? match[3]];
    nodes.push(render ? render(match[2] ?? "") : match[0]);
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    nodes.push(text.slice(last));
  }
  return createElement(Fragment, null, ...nodes);
}

export function translator(language: Language, dict: Dict): Translator {
  const rules = new Intl.PluralRules(language.locale);
  const numbers = new Intl.NumberFormat(language.numbers ?? language.locale);
  const find = (key: string): unknown => walk(dict, key) ?? walk(en, key);
  const fill = (text: string, vars?: Vars) =>
    text.replace(/\{\{(\w+)\}\}/g, (match, name: string) => {
      const value = vars?.[name];
      return value === undefined ? match : typeof value === "number" ? numbers.format(value) : value;
    });
  const pick = (key: string, vars?: Vars): string => {
    const count = vars?.count;
    const forms = typeof count === "number" ? (find(`${key}_${rules.select(count)}`) ?? find(`${key}_other`)) : undefined;
    const text = forms ?? find(key);
    return typeof text === "string" ? fill(text, vars) : key;
  };
  return {
    language,
    t: pick,
    rich: (key, parts, vars) => renderRich(pick(key, vars), parts),
    raw: <T,>(key: Key) => find(key) as T,
  };
}

type SectionName = { [K in keyof Dict]: Dict[K] extends string ? never : K }[keyof Dict] & string;

export type SectionKey<S extends SectionName> = Base<Leaves<Dict[S]>>;

export interface Words<S extends SectionName> {
  (key: SectionKey<S>, vars?: Vars): string;
  rich: (key: SectionKey<S>, parts: Parts, vars?: Vars) => ReactNode;
  raw: <T>(key: SectionKey<S>) => T;
}

export interface LangChoice {
  language: Language;
  dict: Dict;
  setLang: (id: string) => void;
}

export const LangContext = createContext<LangChoice>({ language: ENGLISH, dict: en, setLang: () => undefined });

export function useLang(): LangChoice {
  return useContext(LangContext);
}

export function useT(): Translator {
  const { language, dict } = useContext(LangContext);
  return useMemo(() => translator(language, dict), [language, dict]);
}

export function savedLang(): string {
  try {
    const stored = localStorage.getItem("lang");
    if (stored && LANGS.some((language) => language.id === stored)) {
      return stored;
    }
  } catch {
    return ENGLISH.id;
  }
  const wanted = navigator.languages.map((tag) => tag.toLowerCase().split("-")[0]);
  return wanted.map((code) => LANGS.find((language) => language.id === code)).find(Boolean)?.id ?? ENGLISH.id;
}

export function useSection<S extends SectionName>(name: S): Words<S> {
  const translate = useT();
  return useMemo(() => {
    const scoped = (key: string) => `${name}.${key}` as Key;
    return Object.assign((key: string, vars?: Vars) => translate.t(scoped(key), vars), {
      rich: (key: string, parts: Parts, vars?: Vars) => translate.rich(scoped(key), parts, vars),
      raw: <T,>(key: string) => translate.raw<T>(scoped(key)),
    }) as unknown as Words<S>;
  }, [translate, name]);
}
