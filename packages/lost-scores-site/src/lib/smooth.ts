import { flushSync } from "react-dom";

export function smoothly(update: () => void): void {
  if (document.documentElement.classList.contains("motion-off") || typeof document.startViewTransition !== "function") {
    update();
    return;
  }
  document.startViewTransition(() => flushSync(update));
}
