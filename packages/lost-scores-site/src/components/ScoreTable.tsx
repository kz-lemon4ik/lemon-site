import { TrendingDown } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import Avatar from "@/components/Avatar";
import { Grade, MapStatus, Mods } from "@/components/Chips";
import { replayUrl, type LostScore, type PlayRow, type PotentialRow } from "@/lib/api";
import { useFormat, type Format } from "@/lib/format";
import { useSection, type Words } from "@/lib/i18n";

type Text = Words<"table">;

export type Kind = "lost" | "potential" | "plays";

const GRID: Record<Kind, string> = {
  lost: "grid-cols-[44px_minmax(0,1fr)_5.25rem] sm:grid-cols-[44px_minmax(0,1fr)_var(--mods)_76px_100px] lg:grid-cols-[44px_minmax(0,1fr)_var(--mods)_150px_112px_76px_126px]",
  potential:
    "grid-cols-[1.5rem_44px_minmax(0,1fr)_5.25rem] sm:grid-cols-[1.75rem_44px_minmax(0,1fr)_var(--mods)_76px_100px] lg:grid-cols-[1.75rem_44px_minmax(0,1fr)_var(--mods)_76px_126px]",
  plays:
    "grid-cols-[44px_minmax(0,1fr)_5.25rem] sm:grid-cols-[44px_minmax(0,1fr)_var(--mods)_76px_100px] lg:grid-cols-[44px_minmax(0,1fr)_170px_var(--mods)_112px_76px_126px]",
};

function Hit({ label, value, tint }: { label: string; value: number | null; tint: string }) {
  return (
    <span className="inline-flex items-baseline gap-1">
      <span className={`text-[11px] font-semibold ${tint}`}>{label}</span>
      <span className="text-[13.5px] tabular-nums text-lbl">{value ?? 0}</span>
    </span>
  );
}

function PpBox({ pp, lost, children, hint }: { pp: number | null; lost: boolean; children?: ReactNode; hint?: string }) {
  return (
    <span title={hint} className="flex flex-col items-center justify-center self-stretch rounded-md bg-ppbox px-1 py-1.5">
      <span className={`text-lg font-semibold leading-tight tabular-nums ${lost ? "text-lost" : "text-lbl"}`}>
        {pp !== null ? Math.round(pp) : "–"}
        <span className={`ml-0.5 text-xs font-normal ${lost ? "text-lost" : "text-muted"}`}>pp</span>
      </span>
      {children}
    </span>
  );
}

function Gap({ score, t, f }: { score: LostScore; t: Text; f: Format }) {
  const gap = score.pp !== null && score.kept_pp !== null ? score.pp - score.kept_pp : null;
  return (
    <PpBox pp={score.pp} lost={false} hint={score.kept_pp !== null ? `${t("keptPp", { pp: `${f.tenths(score.kept_pp)} pp` })}` : undefined}>
      {gap !== null && gap > 0 && (
        <span title={t("lostOnMap", { pp: `${f.tenths(gap)} pp` })} className="flex items-center gap-1 text-xs font-medium tabular-nums text-down">
          <TrendingDown aria-hidden size={12} />−{f.tenths(gap)} pp
        </span>
      )}
    </PpBox>
  );
}

function Scores({ score, t, f }: { score: LostScore; t: Text; f: Format }) {
  return (
    <span className="hidden text-right tabular-nums lg:block">
      <span className="block text-[13.5px] text-score">{score.score !== null ? f.whole(score.score) : ""}</span>
      {score.kept_score !== null && (
        <span title={t("keptScore")} className="block text-[11.5px] text-muted">
          {t("kept")} <span className="font-semibold text-lbl">{f.whole(score.kept_score)}</span>
        </span>
      )}
    </span>
  );
}

function PlayerCell({ row }: { row: PlayRow }) {
  return (
    <Link to={`/u/${row.user_id}`} className="hidden min-w-0 items-center gap-2 text-sm text-lbl hover:underline lg:flex">
      <Avatar id={row.user_id} name={row.username} size={26} />
      <span className="truncate">{row.username}</span>
    </Link>
  );
}

function Row({ score, kind, t, f }: { score: LostScore | PotentialRow | PlayRow; kind: Kind; t: Text; f: Format }) {
  const top = kind === "potential" ? (score as PotentialRow) : null;
  const play = kind === "plays" ? (score as PlayRow) : null;
  const lost = top?.lost ?? false;
  const accuracy = score.accuracy !== null ? f.accuracy(score.accuracy) : "";
  return (
    <li className={`grid min-h-[58px] items-center gap-x-3 rounded-lg py-0.5 pl-3 pr-0.5 sm:gap-x-3.5 ${GRID[kind]} ${lost ? "bg-row-lost" : "bg-row"}`}>
      {top && <span className="text-right text-sm font-semibold tabular-nums text-muted">{top.place ?? ""}</span>}
      <Grade grade={score.rank} />
      <div className="min-w-0 py-1.5">
        <p className="flex min-w-0 items-baseline gap-2">
          {lost && <span className="shrink-0 self-center rounded-[5px] bg-lost px-1.5 text-[10.5px] font-semibold leading-[17px] text-[#2b1218]">LOST</span>}
          <span className="truncate text-[15px] font-medium text-lbl">{score.title ?? t("unknown")}</span>
          {score.artist && (
            <span className="hidden min-w-[3rem] truncate text-[13px] text-by sm:inline">
              {t("by")} {score.artist}
            </span>
          )}
        </p>
        <p className="mt-0.5 flex min-w-0 items-center gap-x-2.5 text-[12.5px]">
          {play && (
            <Link to={`/u/${play.user_id}`} className="shrink-0 font-medium text-lbl hover:underline lg:hidden">
              {play.username}
            </Link>
          )}
          <span className="shrink-0 sm:hidden">
            <Mods mods={score.mods} />
          </span>
          {accuracy && <span className="shrink-0 tabular-nums text-lbl sm:hidden">{accuracy}</span>}
          {score.version && <span className="min-w-0 truncate text-acc">{score.version}</span>}
          {score.score_time && <span className="hidden shrink-0 text-meta md:inline">{f.day(score.score_time)}</span>}
          {score.beatmap_id && (
            <a
              href={`https://osu.ppy.sh/b/${score.beatmap_id}`}
              className="hidden shrink-0 text-bid underline decoration-bid/40 underline-offset-2 hover:decoration-bid md:inline"
            >
              b/{score.beatmap_id}
            </a>
          )}
          <span className="hidden sm:contents">
            <MapStatus status={score.status} />
          </span>
          {lost && score.kept_pp !== null && <span className="hidden shrink-0 text-lost xl:inline">{t("keptPp", { pp: `${f.tenths(score.kept_pp)} pp` })}</span>}
          {score.replay && (
            <a
              href={replayUrl(score.replay)}
              title={t("replayHint")}
              className="inline-grid h-[17px] shrink-0 place-items-center rounded bg-up/15 px-1.5 text-[11px] font-semibold text-up hover:bg-up/25"
            >
              {t("replay")}
            </a>
          )}
        </p>
      </div>
      {play && <PlayerCell row={play} />}
      <span className="hidden sm:block">
        <Mods mods={score.mods} />
      </span>
      {kind === "lost" && (
        <span className="hidden gap-3 lg:flex">
          <Hit label="100" value={score.count100} tint="text-hit100" />
          <Hit label="50" value={score.count50} tint="text-hit50" />
          <Hit label="miss" value={score.countMiss} tint="text-hitmiss" />
        </span>
      )}
      {kind !== "potential" && <Scores score={score} t={t} f={f} />}
      <span className="hidden text-right text-sm font-medium tabular-nums text-lbl sm:block">{accuracy}</span>
      {top ? (
        <PpBox pp={score.pp} lost={lost}>
          {top.weight !== null && top.weighted !== null && (
            <span className="text-[11.5px] tabular-nums text-muted">
              {Math.round(top.weight * 100)}% · {f.tenths(top.weighted)}
            </span>
          )}
        </PpBox>
      ) : (
        <Gap score={score} t={t} f={f} />
      )}
    </li>
  );
}

export default function ScoreTable({ rows, kind = "lost", toolbar }: { rows: (LostScore | PotentialRow | PlayRow)[]; kind?: Kind; toolbar?: ReactNode }) {
  const t = useSection("table");
  const f = useFormat();
  const widest = Math.max(1, ...rows.map((row) => row.mods.length));
  const style = { "--mods": `${widest * 30 - 4}px` } as CSSProperties;
  return (
    <div style={style} className="pt-3">
      {toolbar}
      <div aria-hidden className={`hidden items-end gap-x-3.5 pb-2 pl-3 pr-0.5 text-xs text-meta sm:grid ${GRID[kind]}`}>
        {kind === "potential" && <span />}
        <span />
        <span>{t("beatmap")}</span>
        {kind === "plays" && <span className="hidden lg:block">{t("player")}</span>}
        <span>{t("mods")}</span>
        {kind === "lost" && <span className="hidden lg:block">{t("hits")}</span>}
        {kind !== "potential" && <span className="hidden text-right lg:block">{t("score")}</span>}
        <span className="text-right">{t("accuracy")}</span>
        <span className="text-center">PP</span>
      </div>
      <ol className="space-y-1.5">
        {rows.map((row, index) => (
          <Row key={`${row.beatmap_id ?? "map"}-${index}`} score={row} kind={kind} t={t} f={f} />
        ))}
      </ol>
    </div>
  );
}
