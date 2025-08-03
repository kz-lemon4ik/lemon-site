import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      const mediaQueryList = window.matchMedia(QUERY);
      setPrefersReducedMotion(mediaQueryList.matches);

      const listener = (event: MediaQueryListEvent) => {
        setPrefersReducedMotion(event.matches);
      };

      if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener("change", listener);
        return () => {
          mediaQueryList.removeEventListener("change", listener);
        };
      } else if (mediaQueryList.addListener) {
        mediaQueryList.addListener(listener);
        return () => {
          mediaQueryList.removeListener(listener);
        };
      }
    }
  }, []);

  return prefersReducedMotion;
}
