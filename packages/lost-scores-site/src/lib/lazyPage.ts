import { lazy, type ComponentType } from "react";

const RELOADED = "page-reload";

function mayReload(): boolean {
  try {
    if (sessionStorage.getItem(RELOADED)) {
      return false;
    }
    sessionStorage.setItem(RELOADED, "1");
    return true;
  } catch {
    return false;
  }
}

function loaded(): void {
  try {
    sessionStorage.removeItem(RELOADED);
  } catch {
    return;
  }
}

export function lazyPage<T extends ComponentType>(load: () => Promise<{ default: T }>) {
  return lazy(() =>
    load().then(
      (page) => {
        loaded();
        return page;
      },
      (error: unknown) => {
        if (mayReload()) {
          window.location.reload();
          return new Promise<{ default: T }>(() => undefined);
        }
        throw error;
      },
    ),
  );
}
