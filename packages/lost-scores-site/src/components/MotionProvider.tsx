import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { MotionContext } from "@/lib/motion";

const KEY = "userMotionPreference";

function initiallyEnabled(): boolean {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored !== null) {
      return JSON.parse(stored) !== true;
    }
  } catch {
    return true;
  }
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function MotionProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(initiallyEnabled);
  const [chosen, setChosen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("motion-off", !enabled);
    if (chosen) {
      try {
        localStorage.setItem(KEY, JSON.stringify(!enabled));
      } catch {
        return;
      }
    }
  }, [enabled, chosen]);

  const toggle = useCallback(() => {
    setChosen(true);
    setEnabled((current) => !current);
  }, []);

  const value = useMemo(() => ({ enabled, toggle }), [enabled, toggle]);
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}
