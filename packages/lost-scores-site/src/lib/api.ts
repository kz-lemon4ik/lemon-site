export interface RankingRow {
  username: string;
  user_id: number;
  place: number;
  global_rank: number | null;
  scan_date: string | null;
  lost_scores_count: number;
  total_pp_gain: number;
  current_pp: number;
  potential_pp: number;
  verified: boolean;
}

export interface LostScore {
  replay: string | null;
  pp: number | null;
  kept_pp: number | null;
  score: number | null;
  kept_score: number | null;
  beatmap_id: number | null;
  beatmapset_id: number | null;
  artist: string | null;
  title: string | null;
  creator: string | null;
  version: string | null;
  mods: string[];
  accuracy: number | null;
  count100: number | null;
  count50: number | null;
  countMiss: number | null;
  rank: string | null;
  status: string | null;
  score_time: string | null;
}

export interface ScanPage {
  metadata: {
    analysis_timestamp: string | null;
    user_identifier: string;
    user_id?: number;
  };
  summary_stats: {
    lost_scores_found: number;
    lost_scores_total: number;
    current_pp: number;
    potential_pp: number;
    delta_pp: number;
    current_global_rank: number;
    current_accuracy: number | null;
    potential_accuracy: number | null;
    lost_in_top: number | null;
    average_gap?: number | null;
    biggest_gap?: number | null;
    oldest_played?: string | null;
  };
  lost_scores: LostScore[];
  total_count: number;
  verified: boolean;
  hall_rank?: number | null;
  potential_rank?: number | null;
  include_all?: boolean | null;
  potential_top?: PotentialRow[];
}

export interface Hall {
  total: number;
  rows: RankingRow[];
}

export interface PlayRow extends LostScore {
  user_id: number;
  username: string;
  place: number | null;
}

export interface Plays {
  total: number;
  rows: PlayRow[];
}

export type MedalId =
  | "first"
  | "quarter"
  | "half"
  | "threeQuarters"
  | "all"
  | "ppQuarter"
  | "ppHalf"
  | "ppThreeQuarters"
  | "biggest"
  | "five"
  | "oldest"
  | "fc"
  | "ss"
  | "harder";

export interface MedalState {
  id: MedalId;
  at: number | null;
  have?: number;
  need?: number;
  percent?: boolean;
}

export interface Fix {
  beatmap_id: number;
  beatmapset_id: number | null;
  title: string | null;
  artist: string | null;
  version: string | null;
  creator: string | null;
  status: string | null;
  lost_pp: number;
  kept_pp: number;
  pp: number | null;
  grade: string | null;
  accuracy: number | null;
  mods: string[];
  fc: boolean;
  lazer: boolean;
  fixed_at: number;
}

export interface Progress {
  total: number;
  fixed: number;
  later: number;
  medals: MedalState[];
  fixes: Fix[];
  fixes_total: number;
}

export interface PageQuery {
  offset: number;
  limit: number;
  potential?: boolean;
  gap?: boolean;
}

export interface PotentialRow extends LostScore {
  place: number | null;
  weight: number | null;
  weighted: number | null;
  lost: boolean;
}

export interface Me {
  id: number;
  username: string;
}

export interface OwnScan {
  id: string;
  made_at: number;
  created_at: number;
  visibility: "public" | "private";
  status: string;
  current_pp: number;
  potential_pp: number;
  lost_pp: number;
  lost_total: number;
  lost_ranked: number;
}

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`The server answered ${status}`);
    this.status = status;
  }
}

async function get<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(path, { signal, headers: { accept: "application/json" } });
  if (!response.ok) {
    throw new ApiError(response.status);
  }
  return (await response.json()) as T;
}

const SHARED_MS = 60_000;
const recent = new Map<string, { at: number; data: unknown }>();

async function shared<T>(path: string, signal?: AbortSignal): Promise<T> {
  const known = recent.get(path);
  if (known && Date.now() - known.at < SHARED_MS) {
    return known.data as T;
  }
  const data = await get<T>(path, signal);
  recent.set(path, { at: Date.now(), data });
  return data;
}

async function remove(path: string): Promise<void> {
  const response = await fetch(path, { method: "DELETE", headers: { accept: "application/json" } });
  if (!response.ok) {
    throw new ApiError(response.status);
  }
}

function page({ offset, limit, potential = false, gap = false }: PageQuery): string {
  return `offset=${offset}&limit=${limit}${potential ? "&with=potential" : ""}${gap ? "&sort=gap" : ""}`;
}

export interface AdminRow {
  id: string;
  osu_id: number;
  username: string;
  created_at: number;
  made_at: number;
  published_at: number | null;
  visibility: string;
  status: string;
  lost_pp: number | null;
  global_rank: number | null;
  verdict: string | null;
  attempts: number | null;
  checked_at: number | null;
  notes: number;
  replays: number;
}

export interface AdminList {
  summary: { published: number; waiting: number; flagged: number; flagged_waiting?: number; hidden: number };
  total: number;
  rows: AdminRow[];
}

export interface AdminNote {
  code: string;
  beatmap_id?: number;
  flag: boolean;
  detail: string;
}

export interface AdminScan extends AdminRow {
  previous_names: string[];
  current_pp: number | null;
  potential_pp: number | null;
  lost_total: number;
  lost_ranked: number;
  app: string;
  formula: string;
  queued_at: number | null;
}

export interface AdminLogEntry {
  at: number;
  osu_id: number;
  username: string | null;
  action: string;
  submission_id: string | null;
  detail: string | null;
}

async function post<T>(path: string, body?: unknown): Promise<T> {
  const response = await fetch(path, {
    method: "POST",
    headers: { accept: "application/json", ...(body === undefined ? {} : { "content-type": "application/json" }) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!response.ok) {
    throw new ApiError(response.status);
  }
  return (await response.json()) as T;
}

export const admin = {
  me: (signal?: AbortSignal) => get<{ admin: boolean; osu_id: number; flagged_waiting?: number }>("/api/admin/me", signal),
  scans: (view: string, offset: number, signal?: AbortSignal) => get<AdminList>(`/api/admin/scans?view=${view}&offset=${offset}`, signal),
  scan: (id: string, signal?: AbortSignal) => get<Omit<AdminScan, "notes"> & { notes: AdminNote[] }>(`/api/admin/scans/${encodeURIComponent(id)}`, signal),
  status: (id: string, status: string) => post<{ id: string; status: string }>(`/api/admin/scans/${encodeURIComponent(id)}/status`, { status }),
  recheck: (id: string) => post<{ id: string }>(`/api/admin/scans/${encodeURIComponent(id)}/recheck`),
  replays: (id: string) => post<{ id: string; removed: number }>(`/api/admin/scans/${encodeURIComponent(id)}/replays`),
  log: (signal?: AbortSignal) => get<AdminLogEntry[]>("/api/admin/log", signal),
  notify: () => post<{ sent: boolean }>("/api/admin/notify"),
};

export const LOGIN_URL = "/api/auth/web-login";

export const api = {
  rankings: (offset: number, limit: number, signal?: AbortSignal) => shared<Hall>(`/api/submissions/list?offset=${offset}&limit=${limit}`, signal),
  players: (ids: number[], signal?: AbortSignal) => shared<Hall>(`/api/submissions/list?ids=${ids.join(",")}&limit=${ids.length}`, signal),
  notable: (signal?: AbortSignal) => shared<Hall>("/api/submissions/list?notable=1", signal),
  plays: (offset: number, limit: number, replay: boolean, signal?: AbortSignal) =>
    shared<Plays>(`/api/plays?offset=${offset}&limit=${limit}${replay ? "&replay=1" : ""}`, signal),
  player: (id: string, query: PageQuery, signal?: AbortSignal) => get<ScanPage>(`/api/submissions/${encodeURIComponent(id)}?${page(query)}`, signal),
  progress: (osuId: number, offset: number, limit: number, signal?: AbortSignal) =>
    get<Progress>(`/api/v1/progress/${osuId}?offset=${offset}&limit=${limit}`, signal),
  scan: (id: string, query: PageQuery, signal?: AbortSignal) => get<ScanPage>(`/api/submission/${encodeURIComponent(id)}?${page(query)}`, signal),
  me: (signal?: AbortSignal) => get<Me>("/api/user/me", signal),
  ownScans: (signal?: AbortSignal) => get<OwnScan[]>("/api/user/submissions", signal),
  unpublishOwn: (id: string) => post<{ id: string; visibility: string }>(`/api/user/submissions/${encodeURIComponent(id)}/unpublish`),
  deleteOwn: (id: string) => remove(`/api/user/submissions/${encodeURIComponent(id)}`),
  logout: () => fetch("/api/auth/logout", { method: "POST" }),
};

export function replayUrl(sha256: string): string {
  return `/api/v1/replays/${sha256}`;
}

export function mapUrl(beatmapId: number | null): string | null {
  return beatmapId ? `https://osu.ppy.sh/beatmaps/${beatmapId}` : null;
}
