import { useEffect, useState } from "react";
import type { Platform } from "@/lib/platform";

export const REPOSITORY = "https://github.com/kz-lemon4ik/osu-lost-scores";
const LATEST = "https://api.github.com/repos/kz-lemon4ik/osu-lost-scores/releases/latest";
const DOWNLOADS = `${REPOSITORY}/releases/download/`;
const MIRROR = "/dl/latest.json";
const MIRROR_FILES = "https://lost.lemon4ik.kz/dl/";

export interface ReleaseFile {
  name: string;
  url: string;
  size: number;
}

export interface Release {
  version: string;
  published: string;
  page: string;
  files: Partial<Record<Platform, ReleaseFile>>;
  cli: Partial<Record<Platform, ReleaseFile>>;
  sums: ReleaseFile | null;
  signature: ReleaseFile | null;
}

export type ReleaseState =
  | { status: "loading" }
  | { status: "ready"; release: Release }
  | { status: "none" }
  | { status: "error" };

interface GithubAsset {
  name: string;
  size: number;
  browser_download_url: string;
}

interface GithubRelease {
  tag_name: string;
  published_at: string;
  assets: GithubAsset[];
}

const APP_FILES: Record<Platform, string> = {
  windows: "windows-x64.exe",
  macos: "macos-arm64.zip",
  linux: "linux-x64.tar.gz",
};

const CLI_FILES: Partial<Record<Platform, string>> = {
  windows: "windows-x64.zip",
  macos: "macos-arm64.zip",
};

export function parseRelease(data: GithubRelease, mirror = false): Release {
  const allowed = mirror ? MIRROR_FILES : DOWNLOADS;
  const version = data.tag_name.replace(/^v/, "");
  const release: Release = {
    version,
    published: data.published_at,
    page: `${REPOSITORY}/releases/tag/${encodeURIComponent(data.tag_name)}`,
    files: {},
    cli: {},
    sums: null,
    signature: null,
  };
  for (const asset of data.assets) {
    if (!asset.browser_download_url.startsWith(allowed)) {
      continue;
    }
    const file = { name: asset.name, url: asset.browser_download_url, size: asset.size };
    if (asset.name === "SHA256SUMS") {
      release.sums = file;
    } else if (asset.name === "SHA256SUMS.minisig") {
      release.signature = file;
    }
    for (const platform of Object.keys(APP_FILES) as Platform[]) {
      if (asset.name === `lost-scores-${version}-${APP_FILES[platform]}`) {
        release.files[platform] = file;
      }
      if (CLI_FILES[platform] && asset.name === `lost-scores-cli-${version}-${CLI_FILES[platform]}`) {
        release.cli[platform] = file;
      }
    }
  }
  return release;
}

let latest: Promise<ReleaseState> | null = null;

async function fromMirror(): Promise<ReleaseState | null> {
  try {
    const response = await fetch(MIRROR, { headers: { accept: "application/json" } });
    return response.ok ? { status: "ready", release: parseRelease((await response.json()) as GithubRelease, true) } : null;
  } catch {
    return null;
  }
}

async function fromGithub(): Promise<ReleaseState> {
  try {
    const response = await fetch(LATEST, { headers: { accept: "application/vnd.github+json" } });
    if (response.status === 404) {
      return { status: "none" };
    }
    if (response.ok) {
      return { status: "ready", release: parseRelease((await response.json()) as GithubRelease) };
    }
  } catch {
    return { status: "error" };
  }
  return { status: "error" };
}

async function lookUp(): Promise<ReleaseState> {
  return (await fromMirror()) ?? fromGithub();
}

function loadLatest(): Promise<ReleaseState> {
  latest ??= lookUp();
  return latest;
}

export function useRelease(): ReleaseState {
  const [state, setState] = useState<ReleaseState>({ status: "loading" });
  useEffect(() => {
    let alive = true;
    loadLatest().then((next) => {
      if (alive) {
        setState(next);
      }
    });
    return () => {
      alive = false;
    };
  }, []);
  return state;
}
