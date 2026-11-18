import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { smoothly } from "@/lib/smooth";
import { applyTheme, savedTheme, ThemeContext, type Theme } from "@/lib/theme";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(savedTheme);
  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch {
      return;
    }
  }, [theme]);
  const setTheme = useCallback((next: Theme) => {
    smoothly(() => {
      applyTheme(next);
      setThemeState(next);
    });
  }, []);
  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
