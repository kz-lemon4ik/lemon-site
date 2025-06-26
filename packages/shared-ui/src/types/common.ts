export interface LanguageOption {
  code: string;
  name: string;
}

export interface NavigationItem {
  href: string;
  label: string;
}

export type Theme = "light" | "dark";

export type Alignment = "left" | "center" | "right" | "justify";

export type Size = "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";

export type PaddingVariant = "none" | "small" | "default" | "large";
