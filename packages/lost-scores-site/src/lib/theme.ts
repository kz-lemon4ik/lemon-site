import { createContext, useContext } from "react";

export type Theme = "dark" | "light";

export interface ThemeChoice {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeChoice>({ theme: "dark", setTheme: () => undefined });

export function useTheme(): ThemeChoice {
  return useContext(ThemeContext);
}

export function savedTheme(): Theme {
  try {
    return (localStorage.getItem("theme") ?? "").replace(/"/g, "") === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#faf9fc" : "#1d1c22");
  document.querySelector('meta[name="color-scheme"]')?.setAttribute("content", theme);
}
