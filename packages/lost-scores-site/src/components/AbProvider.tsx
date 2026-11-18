import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { AbContext, type Variant } from "@/lib/ab";

function initial(key: "font" | "layout"): Variant {
  const fromLink = new URLSearchParams(window.location.search).get(key);
  if (fromLink === "a" || fromLink === "b") {
    return fromLink;
  }
  try {
    return localStorage.getItem(`ab-${key}`) === "b" ? "b" : "a";
  } catch {
    return "a";
  }
}

export default function AbProvider({ children }: { children: ReactNode }) {
  const [font, setFont] = useState<Variant>(() => initial("font"));
  const [layout, setLayout] = useState<Variant>(() => initial("layout"));

  useEffect(() => {
    document.documentElement.dataset.font = font;
    try {
      localStorage.setItem("ab-font", font);
      localStorage.setItem("ab-layout", layout);
    } catch {
      return;
    }
  }, [font, layout]);

  const choose = useCallback((key: "font" | "layout", value: Variant) => {
    if (key === "font") {
      setFont(value);
    } else {
      setLayout(value);
    }
  }, []);

  const value = useMemo(() => ({ font, layout, choose }), [font, layout, choose]);
  return <AbContext.Provider value={value}>{children}</AbContext.Provider>;
}
