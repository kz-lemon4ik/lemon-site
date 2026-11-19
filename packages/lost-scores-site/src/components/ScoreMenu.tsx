import { Download, ExternalLink, Eye, MoreVertical, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import Avatar from "@/components/Avatar";
import { Grade, MapStatus, Mods } from "@/components/Chips";
import { mapUrl, replayUrl, type LostScore, type PlayRow, type PotentialRow } from "@/lib/api";
import { useDismiss } from "@/lib/dismiss";
import { useFormat } from "@/lib/format";
import { useSection } from "@/lib/i18n";

type Row = LostScore | PotentialRow | PlayRow;

function Figure({ label, tint = "text-meta", children }: { label: string; tint?: string; children: ReactNode }) {
  return (
    <div>
      <p className={`text-xs font-medium ${tint}`}>{label}</p>
      <p className="mt-0.5 text-lg font-semibold tabular-nums text-lbl">{children}</p>
    </div>
  );
}

function ScoreCard({ row, lost, titleId, onClose }: { row: Row; lost: boolean; titleId: string; onClose: () => void }) {
  const t = useSection("table");
  const f = useFormat();
  const play = "user_id" in row ? row : null;
  const map = mapUrl(row.beatmap_id);
  const gap = row.pp !== null && row.kept_pp !== null ? row.pp - row.kept_pp : null;
  const title = row.title ?? t("unknown");
  return (
    <div tabIndex={-1} autoFocus className="result-pop p-5 outline-none sm:p-6">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h2 id={titleId} className="truncate text-xl leading-tight text-lbl">
            {map ? (
              <a href={map} className="decoration-lbl/40 underline-offset-2 hover:underline">
                {title}
              </a>
            ) : (
              title
            )}
          </h2>
          <p className="mt-1 truncate text-sm text-by">
            {row.artist && `${t("by")} ${row.artist}`}
            {row.artist && row.creator && " · "}
            {row.creator && t("mappedBy", { name: row.creator })}
          </p>
          {row.version && <p className="mt-0.5 truncate text-sm text-acc">{row.version}</p>}
        </div>
        <button
          type="button"
          aria-label={t("close")}
          onClick={onClose}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-btn hover:text-lbl"
        >
          <X aria-hidden size={18} />
        </button>
      </div>

      {play && (
        <Link to={`/u/${play.user_id}`} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-lbl hover:underline">
          <Avatar id={play.user_id} name={play.username} size={24} />
          {play.username}
        </Link>
      )}

      <div className="mt-5 flex items-center gap-4">
        <Grade grade={row.rank} />
        <div className="min-w-0 flex-1">
          <p className="text-xs text-meta">{t("score")}</p>
          <p className="text-2xl font-semibold tabular-nums text-lbl">{row.score !== null ? f.whole(row.score) : "–"}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold tabular-nums text-lbl">
            {row.pp !== null ? Math.round(row.pp) : "–"}
            <span className="ml-0.5 text-sm font-normal text-muted">pp</span>
          </p>
          {lost && gap !== null && gap > 0 && <p className="text-sm tabular-nums text-down">−{f.tenths(gap)} pp</p>}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-3 rounded-xl bg-row px-4 py-3">
        <Figure label={t("accuracy")}>{row.accuracy !== null ? f.accuracy(row.accuracy) : "–"}</Figure>
        <Figure label="100" tint="text-hit100">
          {row.count100 ?? 0}
        </Figure>
        <Figure label="50" tint="text-hit50">
          {row.count50 ?? 0}
        </Figure>
        <Figure label={t("miss")} tint="text-hitmiss">
          {row.countMiss ?? 0}
        </Figure>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <Mods mods={row.mods} />
        {row.score_time && <span className="text-meta">{t("played", { date: f.day(row.score_time) })}</span>}
        <MapStatus status={row.status} />
      </div>

      {lost && row.kept_score !== null && row.kept_pp !== null && (
        <p className="mt-4 rounded-xl bg-row-lost px-4 py-3 text-sm text-lbl">
          {t("keptBy", { score: f.whole(row.kept_score), pp: `${f.tenths(row.kept_pp)} pp` })}
        </p>
      )}

      {(row.replay || map) && (
        <div className="mt-5 flex flex-wrap gap-2">
          {row.replay && (
            <a href={replayUrl(row.replay)} className="btn-small px-4 py-2">
              <Download aria-hidden size={16} />
              {t("downloadReplay")}
            </a>
          )}
          {map && (
            <a href={map} className="btn-small px-4 py-2">
              <ExternalLink aria-hidden size={16} />
              {t("openMap")}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function ScoreMenu({ row, lost }: { row: Row; lost: boolean }) {
  const t = useSection("table");
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const close = useCallback(() => setOpen(false), []);
  useDismiss(open, close, box);
  useEffect(() => {
    if (shown) {
      dialog.current?.showModal();
    }
  }, [shown]);
  useEffect(() => {
    if (open) {
      menu.current?.querySelector<HTMLElement>("[role=menuitem]")?.focus();
    }
  }, [open]);
  const onMenuKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      close();
      trigger.current?.focus();
      return;
    }
    const items = [...(menu.current?.querySelectorAll<HTMLElement>("[role=menuitem]") ?? [])];
    const index = items.findIndex((item) => item === document.activeElement);
    const moves: Record<string, number> = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: items.length - 1 };
    const next = moves[event.key];
    if (next !== undefined && items.length > 0) {
      event.preventDefault();
      items[(next + items.length) % items.length].focus();
    }
  };
  const view = () => {
    close();
    setShown(true);
  };
  const hide = () => dialog.current?.close();
  return (
    <div ref={box} className="relative justify-self-center">
      <button
        ref={trigger}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("actions")}
        title={t("actions")}
        onClick={() => setOpen((current) => !current)}
        className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-btn hover:text-lbl aria-expanded:bg-btn aria-expanded:text-lbl"
      >
        <MoreVertical aria-hidden size={18} />
      </button>
      {open && (
        <div ref={menu} role="menu" onKeyDown={onMenuKey} className="menu-pop absolute right-0 top-full z-30 mt-1 w-52 rounded-xl bg-card p-1 shadow-2xl ring-1 ring-divider">
          <button
            type="button"
            role="menuitem"
            onClick={view}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-lbl transition-colors hover:bg-btn focus-visible:bg-btn focus-visible:outline-none"
          >
            <Eye aria-hidden size={16} className="text-muted" />
            {t("viewScore")}
          </button>
          {row.replay && (
            <a
              role="menuitem"
              href={replayUrl(row.replay)}
              onClick={close}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-lbl transition-colors hover:bg-btn focus-visible:bg-btn focus-visible:outline-none"
            >
              <Download aria-hidden size={16} className="text-muted" />
              {t("downloadReplay")}
            </a>
          )}
        </div>
      )}
      {shown && (
        <dialog
          ref={dialog}
          aria-labelledby={titleId}
          onClose={() => {
            setShown(false);
            trigger.current?.focus();
          }}
          onClick={(event) => {
            if (event.target === dialog.current) {
              hide();
            }
          }}
          className="w-[min(28rem,calc(100vw-2rem))] rounded-2xl bg-card p-0 text-left shadow-2xl backdrop:bg-black/70"
        >
          <ScoreCard row={row} lost={lost} titleId={titleId} onClose={hide} />
        </dialog>
      )}
    </div>
  );
}
