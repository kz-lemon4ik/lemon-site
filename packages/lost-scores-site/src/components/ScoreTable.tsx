import { TrendingDown } from "lucide-react";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import Avatar from "@/components/Avatar";
import { Grade, MOD_WIDTH, Mods, StatusIcon } from "@/components/Chips";
import ScoreMenu, { type MenuHandle } from "@/components/ScoreMenu";
import { mapUrl, type LostScore, type PlayRow, type PotentialRow } from "@/lib/api";
import { useFormat, type Format } from "@/lib/format";
import { useSection, type Words } from "@/lib/i18n";

type Text = Words<"table">;

export type Kind = "lost" | "potential" | "plays";

const GRID: Record<Kind, string> = {
  lost: "grid-cols-[18px_40px_minmax(0,1fr)_5rem] sm:grid-cols-[18px_48px_minmax(0,1fr)_var(--mods)_64px_6.5rem]",
  potential: "grid-cols-[1rem_18px_40px_minmax(0,1fr)_5rem] sm:grid-cols-[1.75rem_18px_48px_minmax(0,1fr)_var(--mods)_64px_6.5rem]",
  plays:
    "grid-cols-[18px_40px_minmax(0,1fr)_5rem] sm:grid-cols-[18px_48px_minmax(0,1fr)_var(--mods)_64px_6.5rem] lg:grid-cols-[18px_48px_minmax(0,1fr)_170px_var(--mods)_64px_6.5rem]",
};

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

function PlayerCell({ row }: { row: PlayRow }) {
  return (
    <Link to={`/u/${row.user_id}`} className="hidden min-w-0 items-center gap-2 text-sm text-lbl hover:underline lg:flex">
      <Avatar id={row.user_id} name={row.username} size={26} />
      <span className="truncate">{row.username}</span>
    </Link>
  );
}

function Row({ score, kind, t, f }: { score: LostScore | PotentialRow | PlayRow; kind: Kind; t: Text; f: Format }) {
  const menu = useRef<MenuHandle>(null);
  const top = kind === "potential" ? (score as PotentialRow) : null;
  const play = kind === "plays" ? (score as PlayRow) : null;
  const lost = top?.lost ?? false;
  const accuracy = score.accuracy !== null ? f.accuracy(score.accuracy) : "";
  const map = mapUrl(score.beatmap_id);
  const title = score.title ?? t("unknown");
  const when = score.score_time ? Date.parse(score.score_time) : Number.NaN;
  const names = (
    <>
      <span className="min-w-0 truncate text-[15px] font-medium text-lbl decoration-lbl/40 underline-offset-2 group-hover/map:underline">{title}</span>
      {score.artist && (
        <span className="hidden min-w-[3rem] shrink-[2] truncate text-[13px] text-by decoration-by/40 underline-offset-2 group-hover/map:underline sm:inline">
          {t("by")} {score.artist}
        </span>
      )}
    </>
  );
  return (
    <li className="group flex items-stretch">
      <div
        className={`grid min-h-[58px] flex-1 items-center gap-x-2 rounded-lg py-0.5 pl-2 pr-0.5 sm:gap-x-3.5 sm:pl-3 ${GRID[kind]} ${
          lost ? "bg-row-lost group-hover:bg-row-lost-hover" : "bg-row group-hover:bg-row-hover"
        }`}
      >
        {top && <span className="text-right text-sm font-semibold tabular-nums text-muted">{top.place ?? ""}</span>}
        <StatusIcon status={score.status} lost={lost} />
        <Grade grade={score.rank} />
        <div className="min-w-0 py-1.5">
          <p className="flex min-w-0">
            {map ? (
              <a href={map} className="group/map inline-flex min-w-0 max-w-full items-baseline gap-2">
                {names}
              </a>
            ) : (
              <span className="inline-flex min-w-0 max-w-full items-baseline gap-2">{names}</span>
            )}
          </p>
          <p className="mt-0.5 flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[12.5px]">
            {play && (
              <Link to={`/u/${play.user_id}`} className="shrink-0 font-medium text-lbl hover:underline lg:hidden">
                {play.username}
              </Link>
            )}
            <span className="min-w-0 sm:hidden">
              <Mods mods={score.mods} />
            </span>
            {accuracy && <span className="shrink-0 tabular-nums text-lbl sm:hidden">{accuracy}</span>}
            {score.version && (
              <button
                type="button"
                title={t("viewScore")}
                onClick={(event) => menu.current?.view(event.currentTarget)}
                className="min-w-0 truncate text-left text-acc decoration-acc/40 underline-offset-2 hover:underline"
              >
                {score.version}
              </button>
            )}
            {Number.isFinite(when) && (
              <time dateTime={score.score_time ?? undefined} title={f.moment(when)} className="hidden shrink-0 text-meta sm:inline">
                {f.ago(when)}
              </time>
            )}
            {lost && score.kept_pp !== null && <span className="hidden shrink-0 text-lost xl:inline">{t("keptPp", { pp: `${f.tenths(score.kept_pp)} pp` })}</span>}
          </p>
        </div>
        {play && <PlayerCell row={play} />}
        <span className="hidden sm:block">
          <Mods mods={score.mods} />
        </span>
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
      </div>
      <ScoreMenu ref={menu} row={score} lost={kind !== "potential" || lost} />
    </li>
  );
}

export default function ScoreTable({ rows, kind = "lost", toolbar }: { rows: (LostScore | PotentialRow | PlayRow)[]; kind?: Kind; toolbar?: ReactNode }) {
  const t = useSection("table");
  const f = useFormat();
  const widest = Math.max(1, ...rows.map((row) => row.mods.length));
  const style = { "--mods": `${widest * MOD_WIDTH - 4}px` } as CSSProperties;
  return (
    <div style={style} className="pt-3">
      {toolbar}
      <div aria-hidden className="hidden pb-2 sm:flex">
        <div className={`grid flex-1 items-end gap-x-3.5 pl-3 pr-0.5 text-xs text-meta ${GRID[kind]}`}>
          {kind === "potential" && <span />}
          <span />
          <span />
          <span>{t("beatmap")}</span>
          {kind === "plays" && <span className="hidden lg:block">{t("player")}</span>}
          <span>{t("mods")}</span>
          <span className="text-right">{t("accuracy")}</span>
          <span className="text-center">PP</span>
        </div>
        <span className="w-8 shrink-0" />
      </div>
      <ol className="space-y-1.5">
        {rows.map((row, index) => (
          <Row key={`${row.beatmap_id ?? "map"}-${index}`} score={row} kind={kind} t={t} f={f} />
        ))}
      </ol>
    </div>
  );
}
