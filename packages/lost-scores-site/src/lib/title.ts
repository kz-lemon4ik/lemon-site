import { useEffect } from "react";

export function useTitle(title?: string): void {
  useEffect(() => {
    document.title = title ? `${title} · osu! Lost Scores` : "osu! Lost Scores";
  }, [title]);
}
