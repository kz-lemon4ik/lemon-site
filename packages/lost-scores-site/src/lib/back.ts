const KEY = "returnTo";

export function rememberPage(): void {
  try {
    sessionStorage.setItem(KEY, window.location.pathname + window.location.search);
  } catch {
    return;
  }
}

export function takePage(): string | null {
  try {
    const page = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    return page && /^\/(?![/\\])[^\s]*$/.test(page) && !page.startsWith("/oauth/") ? page : null;
  } catch {
    return null;
  }
}
