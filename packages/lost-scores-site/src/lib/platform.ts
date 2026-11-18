export type Platform = "windows" | "macos" | "linux";

export const PLATFORM_NAMES: Record<Platform, string> = {
  windows: "Windows",
  macos: "macOS",
  linux: "Linux",
};

export function detectPlatform(): Platform | null {
  const agent = navigator.userAgent;
  if (/Android|iPhone|iPad|iPod/i.test(agent)) {
    return null;
  }
  if (/Windows/i.test(agent)) {
    return "windows";
  }
  if (/Macintosh|Mac OS X/i.test(agent)) {
    return navigator.maxTouchPoints > 1 ? null : "macos";
  }
  if (/Linux|X11/i.test(agent)) {
    return "linux";
  }
  return null;
}
