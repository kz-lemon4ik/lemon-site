import { TrendingUp } from "lucide-react";
import type { CSSProperties } from "react";
import { Grade, Mods } from "@/components/Chips";
import { Message } from "@/components/States";
import { mapUrl, type Fix } from "@/lib/api";
import { useFormat, type Format } from "@/lib/format";
import { useSection } from "@/lib/i18n";

const GRID =
  "grid-cols-[44px_minmax(0,1fr)_5.25rem] sm:grid-cols-[44px_minmax(0,1fr)_var(--mods)_76px_100px] lg:grid-cols-[44px_minmax(0,1fr)_var(--mods)_128px_76px_126px]";

function FixRow({ fix, f, by, unknown }: { fix: Fix; f: Format; by: string; unknown: string }) {
  const map = mapUrl(fix.beatmap_id);
  const title = fix.title ?? unknown;
  const accuracy = fix.accuracy !== null ? f.accuracy(fix.accuracy) : "";
  const gain = fix.pp !== null ? fix.pp - fix.kept_pp : null;
  const at = fix.fixed_at * 1000;
  return (
    <li className={`grid min-h-[58px] items-center gap-x-3 rounded-lg bg-row py-0.5 pl-3 pr-0.5 sm:gap-x-3.5 ${GRID}`}>
      <Grade grade={fix.grade} />
      <div className="min-w-0 py-1.5">
        <p className="flex min-w-0 items-baseline gap-2">
          {map ? (
            <a href={map} className="truncate text-[15px] font-medium text-lbl decoration-lbl/40 underline-offset-2 hover:underline">
              {title}
            </a>
          ) : (
            <span className="truncate text-[15px] font-medium text-lbl">{title}</span>
          )}
          {fix.artist && (
            <span className="hidden min-w-[3rem] truncate text-[13px] text-by sm:inline">
              {by} {fix.artist}
            </span>
          )}
        </p>
        <p className="mt-0.5 flex min-w-0 items-center gap-x-2.5 text-[12.5px]">
          <span className="shrink-0 sm:hidden">
            <Mods mods={fix.mods} />
          </span>
          {accuracy && <span className="shrink-0 tabular-nums text-lbl sm:hidden">{accuracy}</span>}
          {fix.version && <span className="min-w-0 truncate text-acc">{fix.version}</span>}
          <span className="shrink-0 text-meta lg:hidden">{f.ago(at)}</span>
        </p>
      </div>
      <span className="hidden sm:block">
        <Mods mods={fix.mods} />
      </span>
      <span className="hidden text-sm lg:block">
        <span className="block text-lbl">{f.day(at)}</span>
        <span className="block text-xs text-muted">{f.ago(at)}</span>
      </span>
      <span className="hidden text-right text-sm font-medium tabular-nums text-lbl sm:block">{accuracy}</span>
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
    </li>
  );
}

export default function FixedTable({ fixes, total, more }: { fixes: Fix[]; total: number; more: () => void }) {
  const t = useSection("progress");
  const table = useSection("table");
  const profile = useSection("profile");
  const f = useFormat();
  if (total === 0) {
    return <Message title={t("noneTitle")}>{t("none")}</Message>;
  }
  const widest = Math.max(1, ...fixes.map((fix) => fix.mods.length));
  const style = { "--mods": `${widest * 30 - 4}px` } as CSSProperties;
  return (
    <div style={style} className="pt-3">
      <div aria-hidden className={`hidden items-end gap-x-3.5 pb-2 pl-3 pr-0.5 text-xs text-meta sm:grid ${GRID}`}>
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
          <button type="button" className="btn-small px-5 py-2" onClick={more}>
            {profile("showMore")}
          </button>
        </div>
      )}
    </div>
  );
}
