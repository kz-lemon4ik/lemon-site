import { TrendingUp } from "lucide-react";
import type { CSSProperties } from "react";
import { Grade, MOD_WIDTH, Mods, StatusIcon } from "@/components/Chips";
import MobileScore from "@/components/MobileScore";
import { Message } from "@/components/States";
import { mapUrl, type Fix } from "@/lib/api";
import { useFormat, type Format } from "@/lib/format";
import { useSection } from "@/lib/i18n";

const GRID = "grid-cols-[18px_48px_minmax(0,1fr)_var(--mods)_64px_6.5rem] lg:grid-cols-[18px_48px_minmax(0,1fr)_var(--mods)_128px_64px_6.5rem]";

function FixRow({ fix, f, by, unknown }: { fix: Fix; f: Format; by: string; unknown: string }) {
  const map = mapUrl(fix.beatmap_id);
  const title = fix.title ?? unknown;
  const accuracy = fix.accuracy !== null ? f.accuracy(fix.accuracy) : "";
  const gain = fix.pp !== null ? fix.pp - fix.kept_pp : null;
  const at = fix.fixed_at * 1000;
  const names = (
    <>
      <span className="min-w-0 truncate text-[15px] font-medium text-lbl decoration-lbl/40 underline-offset-2 group-hover/map:underline">{title}</span>
      {fix.artist && (
        <span className="min-w-[3rem] shrink-[2] truncate text-[13px] text-by decoration-by/40 underline-offset-2 group-hover/map:underline">
          {by} {fix.artist}
        </span>
      )}
    </>
  );
  const gained = gain !== null && gain > 0 && (
    <span className="flex items-center gap-1 font-medium text-up">
      <TrendingUp aria-hidden size={14} />+{f.tenths(gain)} pp
    </span>
  );
  return (
    <li className="group">
      <MobileScore
        title={title}
        artist={fix.artist}
        by={by}
        map={map}
        version={fix.version && <span className="min-w-0 truncate text-acc">{fix.version}</span>}
        when={
          <time dateTime={new Date(at).toISOString()} title={f.moment(at)} className="shrink-0 text-meta">
            {f.ago(at)}
          </time>
        }
        grade={fix.grade}
        accuracy={accuracy}
        extra={gained}
        mods={fix.mods}
        status={<StatusIcon status={fix.status} />}
        pp={fix.pp}
        menu={null}
      />
      <div className={`hidden min-h-[58px] items-center gap-x-3.5 rounded-lg bg-row py-0.5 pl-3 pr-0.5 hover:bg-row-hover sm:grid ${GRID}`}>
        <StatusIcon status={fix.status} />
        <Grade grade={fix.grade} />
        <div className="min-w-0 py-1.5">
          <p className="flex min-w-0">
            {map ? (
              <a href={map} target="_blank" rel="noreferrer" className="group/map inline-flex min-w-0 max-w-full items-baseline gap-2">
                {names}
              </a>
            ) : (
              <span className="inline-flex min-w-0 max-w-full items-baseline gap-2">{names}</span>
            )}
          </p>
          <p className="mt-0.5 flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[12.5px]">
            {fix.version && <span className="min-w-0 truncate text-acc">{fix.version}</span>}
            <time dateTime={new Date(at).toISOString()} title={f.moment(at)} className="shrink-0 text-meta lg:hidden">
              {f.ago(at)}
            </time>
          </p>
        </div>
        <span>
          <Mods mods={fix.mods} />
        </span>
        <span className="hidden text-sm lg:block">
          <span className="block text-lbl">{f.day(at)}</span>
          <span className="block text-xs text-muted">{f.ago(at)}</span>
        </span>
        <span className="text-right text-sm font-medium tabular-nums text-lbl">{accuracy}</span>
        <span className="flex flex-col items-center justify-center self-stretch rounded-md bg-ppbox px-1 py-1.5">
          <span className="text-lg font-semibold leading-tight tabular-nums text-lbl">
            {fix.pp !== null ? Math.round(fix.pp) : "–"}
            <span className="ml-0.5 text-xs font-normal text-muted">pp</span>
          </span>
          {gain !== null && gain > 0 && (
            <span className="flex items-center gap-1 text-xs font-medium tabular-nums text-up">
              <TrendingUp aria-hidden size={12} />+{f.tenths(gain)} pp
            </span>
          )}
        </span>
      </div>
    </li>
  );
}

export default function FixedTable({ fixes, total, more, busy }: { fixes: Fix[]; total: number; more: () => void; busy: boolean }) {
  const t = useSection("progress");
  const table = useSection("table");
  const profile = useSection("profile");
  const f = useFormat();
  if (total === 0) {
    return <Message title={t("noneTitle")}>{t("none")}</Message>;
  }
  const widest = Math.max(1, ...fixes.map((fix) => fix.mods.length));
  const style = { "--mods": `${widest * MOD_WIDTH - 4}px` } as CSSProperties;
  return (
    <div style={style} className="pt-3">
      <div aria-hidden className={`hidden items-end gap-x-3.5 pb-2 pl-3 pr-0.5 text-xs text-meta sm:grid ${GRID}`}>
        <span />
        <span />
        <span>{table("beatmap")}</span>
        <span>{table("mods")}</span>
        <span className="hidden lg:block">{t("colFixed")}</span>
        <span className="text-right">{table("accuracy")}</span>
        <span className="text-center">PP</span>
      </div>
      <ol className="space-y-1.5">
        {fixes.map((fix) => (
          <FixRow key={`${fix.beatmap_id}-${fix.fixed_at}`} fix={fix} f={f} by={table("by")} unknown={table("unknown")} />
        ))}
      </ol>
      {fixes.length < total && (
        <div className="mt-4 text-center">
          <button type="button" className="btn-small px-5 py-2" disabled={busy} onClick={more}>
            {profile("showMore")}
          </button>
        </div>
      )}
    </div>
  );
}
